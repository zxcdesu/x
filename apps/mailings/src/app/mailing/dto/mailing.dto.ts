import { Exclude } from 'class-transformer';
import { Mailing, MailingStatus } from '../../prisma.service';

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

  scheduledAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}
