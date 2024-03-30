import { MessageStatus } from '@zxcdesu/prisma-platform';

export interface MessagePayload {
  externalId: string;
  status: MessageStatus;
  failedReason: string | null;
}
