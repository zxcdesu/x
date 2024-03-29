export interface UpdateChannelPayload<T = unknown> {
  externalId: string;
  token: T;
}
