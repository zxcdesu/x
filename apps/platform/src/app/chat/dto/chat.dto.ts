import { Exclude } from 'class-transformer';
import { Chat } from '../../prisma.service';

export class ChatDto implements Chat {
  id: number;

  @Exclude()
  projectId: number;

  @Exclude()
  channelId: number;

  @Exclude()
  contactId: number;

  accountId: string;

  @Exclude()
  isNew: boolean;

  unreadCount: number;

  createdAt: Date;

  updatedAt: Date;
}
