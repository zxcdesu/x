import { ContactDto } from '@zxcdesu/data-access-contact';
import { MessageDto } from '@zxcdesu/data-access-message';
import { Chat } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';

export class ChatDto implements Chat {
  id: number;

  @Exclude()
  channelId: number;

  @Exclude()
  contactId: number;

  @Type(() => ContactDto)
  contact: ContactDto;

  @Exclude()
  externalId: string;

  unreadMessages: number;

  @Type(() => MessageDto)
  messages: MessageDto[];

  createdAt: Date;

  updatedAt: Date;
}
