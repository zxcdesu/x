export interface EventPayload<Q = unknown, B = unknown> {
  param: {
    channelId: string;
    platform: string;
  };
  query: Q;
  body: B;
}
