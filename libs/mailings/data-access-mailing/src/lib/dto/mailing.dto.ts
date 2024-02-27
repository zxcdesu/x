import { Mailing, MailingStatus } from '@zxcdesu/prisma-mailings';
import { Exclude } from 'class-transformer';

export class MailingDto implements Mailing {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  color: string;

  channelId: number;

  tagIds: number[];

  hsmIds: number[];

  status: MailingStatus;

  failedReason: string | null;

  scheduledAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}
