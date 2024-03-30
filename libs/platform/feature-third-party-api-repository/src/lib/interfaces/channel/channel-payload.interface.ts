import { ChannelStatus } from '@zxcdesu/prisma-platform';

export interface ChannelPayload {
  externalId: string;
  status: ChannelStatus;
  failedReason: string | null;
}
