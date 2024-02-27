export interface YookassaWebhook {
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
}
