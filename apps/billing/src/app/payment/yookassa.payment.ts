import { lastValueFrom, map } from 'rxjs';
import { PaymentStatus } from '../prisma.service';
import { AbstractPayment } from './abstract.payment';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandlePaymentDto } from './dto/handle-payment.dto';
import { PaymentUrlDto } from './dto/payment-url.dto';
import { PaymentDto } from './dto/payment.dto';

export class YookassaPayment extends AbstractPayment<unknown> {
  async create(
    payment: PaymentDto,
    payload: CreatePaymentDto,
  ): Promise<PaymentUrlDto> {
    const { currency } = await this.prismaService.wallet.findUniqueOrThrow({
      where: {
        projectId: payment.projectId,
      },
      select: {
        currency: true,
      },
    });

    const response = await this.request(payment, payload.amount, currency);

    const createdAt = new Date(response.created_at);
    await this.prismaService.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        externalId: response.id,
        expiresAt: new Date(createdAt.getTime() + 600000),
      },
    });

    return {
      url: response.confirmation.confirmation_url,
    };
  }

  async handleWebhook(
    payload: HandlePaymentDto<{
      event:
        | 'payment.succeeded'
        | 'payment.waiting_for_capture'
        | 'payment.canceled'
        | 'refund.succeeded';
      object: {
        id: string;
        income_amount: {
          value: string;
        };
      };
    }>,
  ): Promise<void> {
    const payment = await this.prismaService.payment.findFirst({
      where: {
        externalId: payload.value.object.id,
        provider: payload.provider,
      },
      select: {
        id: true,
        projectId: true,
      },
    });

    if (payment) {
      await this.prismaService.$transaction(async (transaction) => {
        await transaction.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: {
              'payment.succeeded': PaymentStatus.Succeeded,
              'payment.waiting_for_capture': PaymentStatus.Pending,
              'payment.canceled': PaymentStatus.Cancelled,
              'refund.succeeded': PaymentStatus.Refunded,
            }[payload.value.event],
          },
        });

        if (payload.value.event === 'payment.succeeded') {
          await transaction.wallet.update({
            where: {
              projectId: payment.projectId,
            },
            data: {
              currentBalance: {
                increment: payload.value.object.income_amount.value,
              },
            },
          });
        }
      });
    }
  }

  private request(payment: PaymentDto, value: number, currency: string) {
    return lastValueFrom(
      this.httpService
        .post<{
          id: string;
          created_at: string;
          confirmation: {
            confirmation_url: string;
          };
        }>(
          'https://api.yookassa.ru/v3/payments',
          {
            amount: {
              value,
              currency,
            },
            capture: true,
            confirmation: {
              type: 'redirect',
              return_url: this.configService.getOrThrow<string>(
                'YOOKASSA_RETURN_URL',
              ),
            },
            description: null,
          },
          {
            auth: {
              username:
                this.configService.getOrThrow<string>('YOOKASSA_SHOP_ID'),
              password: this.configService.getOrThrow<string>('YOOKASSA_TOKEN'),
            },
            headers: {
              'Idempotence-Key': payment.id,
            },
          },
        )
        .pipe(map(({ data }) => data)),
    );
  }
}
