type YookassaWebhookEvent =
  | 'payment.succeeded'
  | 'payment.waiting_for_capture'
  | 'payment.canceled'
  | 'refund.succeeded';

interface YookassaPaymentAmount {
  value: string;
}

/**
 * Payment object
 *
 * @see https://yookassa.ru/developers/api#payment_object
 */
interface YookassaPaymentObject {
  id: string;
  amount: YookassaPaymentAmount;
  income_amount?: YookassaPaymentAmount;
  refunded_amount?: YookassaPaymentAmount;
  created_at: string;
}

export interface YookassaWebhook {
  event: YookassaWebhookEvent;
  object: YookassaPaymentObject;
}

interface YookassaPendingPaymentConfirmation {
  confirmation_url: string;
}

export interface YookassaPendingPayment
  extends Omit<YookassaPaymentObject, 'income_amount' | 'refunded_amount'> {
  confirmation: YookassaPendingPaymentConfirmation;
}
