export interface EventPayload<Q = unknown, B = unknown> {
  param: {
    id: string;
    platform: string;
  };
  query: Q;
  body: B;
}
