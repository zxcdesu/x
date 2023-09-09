import { ChannelType } from './channel-type.enum';

export interface CreateChannel<T = unknown> {
  id: number;
  type: ChannelType;
  accountId: string;
  token?: T;
}
