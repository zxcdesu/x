import { ChannelStatus } from './channel-status.enum';

export interface ChannelPayload<T = unknown> {
  accountId: string;
  token?: T;
  status: ChannelStatus;
  failedReason?: string;
}
