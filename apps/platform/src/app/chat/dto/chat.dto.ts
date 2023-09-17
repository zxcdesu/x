import { Exclude, Type } from 'class-transformer';
import { ContactDto } from '../../contact/dto/contact.dto';
import { MessageDto } from '../../message/dto/message.dto';
import { Chat } from '../../prisma.service';

export class ChatDto implements Chat {
  id: number;

  @Exclude()
  projectId: number;

  @Exclude()
  channelId: number;

  @Exclude()
  contactId: number;

  @Exclude()
  accountId: string;

  @Type(() => ContactDto)
  contact: ContactDto;

  @Exclude()
  isNew: boolean;

  unreadCount: number;

  @Type(() => MessageDto)
  messages: MessageDto[];

  createdAt: Date;

  updatedAt: Date;
}
