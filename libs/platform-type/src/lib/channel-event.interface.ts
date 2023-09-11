export interface ChannelEvent<Q = unknown, B = unknown> {
  param: {
    channelId: number;
  };
  query: Q;
  body: B;
}
