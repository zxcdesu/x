import { ChannelStatus } from '@zxcdesu/prisma-platform';

export interface ChannelPayload {
  status: ChannelStatus;
  failedReason: string | null;
}
