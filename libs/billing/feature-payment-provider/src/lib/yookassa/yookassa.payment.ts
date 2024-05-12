import {
  CreatePaymentDto,
  HandlePaymentDto,
  PaymentDto,
  PaymentInPendingDto,
} from '@zxcdesu/data-access-payment';
import { PaymentStatus } from '@zxcdesu/prisma-billing';
import { lastValueFrom, map } from 'rxjs';
import { AbstractPayment } from '../abstract.payment';
import {
  YOOKASSA_API_URL,
  YOOKASSA_PAYMENT_EXPIRATION,
} from './yookassa.constants';
import { YookassaPendingPayment, YookassaWebhook } from './yookassa.types';

export class YookassaPayment extends AbstractPayment<unknown> {
  async create(
    payment: PaymentDto,
    payload: CreatePaymentDto,
  ): Promise<PaymentInPendingDto> {
    const wallet = await this.walletService.findOne(payment.projectId);
    const response = await this.request(
      payment,
      payload.amount,
      wallet.currency,
    );

    const createdAt = new Date(response.created_at);
    payment = await this.prepare(
      payment,
      new Date(createdAt.getTime() + YOOKASSA_PAYMENT_EXPIRATION),
      response.id,
    );

    return {
      ...payment,
      url: {
        url: response.confirmation.confirmation_url,
      },
    };
  }

  async handleWebhook(
    payload: HandlePaymentDto<YookassaWebhook>,
  ): Promise<void> {
    const { object } = payload.value;
    const payment = await this.paymentService.findOneOrDefaultByExternalId(
      object.id,
      payload.provider,
    );

    if (payment) {
      const amount =
        object.income_amount ?? object.refunded_amount ?? object.amount;

      await this.complete(
        payment,
        {
          'payment.succeeded': PaymentStatus.Succeeded,
          'payment.waiting_for_capture': PaymentStatus.Pending,
          'payment.canceled': PaymentStatus.Cancelled,
          'refund.succeeded': PaymentStatus.Refunded,
        }[payload.value.event],
        Number(amount.value),
      );
    }
  }

  private request(payment: PaymentDto, value: number, currency: string) {
    return lastValueFrom(
      this.httpService
        .post<YookassaPendingPayment>(
          YOOKASSA_API_URL.concat('/payments'),
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
