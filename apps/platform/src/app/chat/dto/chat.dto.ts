import { Exclude, Type } from 'class-transformer';
import { ContactDto } from '../../contact/dto/contact.dto';
import { MessageDto } from '../../message/dto/message.dto';
import { Chat } from '../../prisma.service';

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
