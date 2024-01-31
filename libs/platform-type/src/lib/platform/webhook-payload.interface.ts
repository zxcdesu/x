export interface WebhookPayload<Q = unknown, B = unknown> {
  param: {
    channelId: number;
  };
  query: Q;
  body: B;
}
