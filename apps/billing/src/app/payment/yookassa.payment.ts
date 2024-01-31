import { lastValueFrom } from 'rxjs';
import { Payment, PaymentStatus } from '../prisma.service';
import { AbstractPayment } from './abstract.payment';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandleWebhookDto } from './dto/handle-webhook.dto';
import { PaymentDto } from './dto/payment.dto';

type Event =
  | 'payment.succeeded'
  | 'payment.waiting_for_capture'
  | 'payment.canceled'
  | 'refund.succeeded';

export class YookassaPayment extends AbstractPayment<unknown> {
  async create(
    payment: Payment,
    payload: CreatePaymentDto,
  ): Promise<PaymentDto> {
    const response = await lastValueFrom(
      this.httpService.post<{
        id: string;
        created_at: string;
        confirmation: {
          confirmation_url: string;
        };
      }>(
        'https://api.yookassa.ru/v3/payments',
        {
          amount: {
            value: payload.value,
            currency: payload.currency,
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: this.configService.get<string>('YOOKASSA_REDIRECT_URL'),
          },
          description: null,
        },
        {
          auth: {
            username: this.configService.get<string>('YOOKASSA_SHOP_ID'),
            password: this.configService.get<string>('YOOKASSA_TOKEN'),
          },
          headers: {
            'Idempotence-Key': payment.id,
          },
        },
      ),
    );

    const createdAt = new Date(response.data.created_at);
    return {
      url: response.data.confirmation.confirmation_url,
      update: {
        externalId: response.data.id,
        expireAt: new Date(createdAt.getTime() + 600000),
      },
    };
  }

  async handleWebhook(
    payload: HandleWebhookDto<{
      event: Event;
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
    });

    if (payment) {
      await this.prismaService.$transaction(async (transaction) => {
        await transaction.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: this.getStatusFromEvent(payload.value.event),
          },
        });

        if (payload.value.event === 'payment.succeeded') {
          await transaction.wallet.update({
            where: {
              projectId: payment.projectId,
            },
            data: {
              currentBalance: {
                increment: Number(payload.value.object.income_amount.value),
              },
            },
          });
        }
      });
    }
  }

  private getStatusFromEvent(event: Event) {
    switch (event) {
      case 'payment.succeeded':
        return PaymentStatus.Succeeded;

      case 'payment.waiting_for_capture':
        return PaymentStatus.Pending;

      case 'payment.canceled':
        return PaymentStatus.Cancelled;

      case 'refund.succeeded':
        return PaymentStatus.Refunded;
    }
  }
}
