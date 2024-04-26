import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ChatDto } from '@zxcdesu/data-access-chat';
import { StringifyDate } from '@zxcdesu/util-types';
import { ContactDto } from '../../contact/dto/contact.dto';
import { MessageDto } from '../../message/dto/message.dto';

@ObjectType()
export class ChatObject
  implements
    Omit<
      StringifyDate<ChatDto>,
      'contact' | 'messages' | 'channelId' | 'contactId' | 'externalId'
    >
{
  @Field(() => Int)
  id: number;

  @Field(() => ContactDto)
  contact: ContactDto;

  @Field(() => Int)
  unreadMessages: number;

  @Field(() => [MessageDto])
  messages: MessageDto[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
