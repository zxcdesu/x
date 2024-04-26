import { CreatePaymentDto, PaymentDto } from '@zxcdesu/data-access-payment';
import { PaymentStatus } from '@zxcdesu/prisma-billing';
import { lastValueFrom, map } from 'rxjs';
import { AbstractPayment } from './abstract.payment';
import { HandlePaymentDto, PaymentUrlDto } from './dto';
import { YookassaResponse } from './yookassa-response.interface';
import { YookassaWebhook } from './yookassa-webhook.interface';

export class YookassaPayment extends AbstractPayment<unknown> {
  async create(
    payment: PaymentDto,
    payload: CreatePaymentDto,
  ): Promise<PaymentUrlDto> {
    const wallet = await this.walletService.findOne(payment.projectId);
    const response = await this.request(
      payment,
      payload.amount,
      wallet.currency,
    );

    const createdAt = new Date(response.created_at);
    await this.paymentService.update(payment.projectId, payment.id, {
      externalId: response.id,
      expiresAt: new Date(createdAt.getTime() + 600000),
    });

    return {
      url: response.confirmation.confirmation_url,
    };
  }

  async handleWebhook(
    payload: HandlePaymentDto<YookassaWebhook>,
  ): Promise<void> {
    const payment = await this.paymentService.findOneOrDefaultByExternalId(
      payload.provider,
      payload.value.object.id,
    );

    if (payment) {
      await this.update(
        payment,
        {
          'payment.succeeded': PaymentStatus.Succeeded,
          'payment.waiting_for_capture': PaymentStatus.Pending,
          'payment.canceled': PaymentStatus.Cancelled,
          'refund.succeeded': PaymentStatus.Refunded,
        }[payload.value.event],
        Number(payload.value.object.income_amount.value),
      );
    }
  }

  private request(payment: PaymentDto, value: number, currency: string) {
    return lastValueFrom(
      this.httpService
        .post<YookassaResponse>(
          'https://api.yookassa.ru/v3/payments',
          {
            amount: {
              value,
              currency,
            },
            capture: true,
            confirmation: {
              type: 'redirect',
              return_url: this.options.yookassa.returnUrl,
            },
            description: null,
          },
          {
            auth: {
              username: this.options.yookassa.shopId,
              password: this.options.yookassa.token,
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
