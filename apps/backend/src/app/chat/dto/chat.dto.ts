import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ContactDto } from '../../contact/dto/contact.dto';
import { MessageDto } from '../../message/dto/message.dto';

@ObjectType()
export class ChatDto {
  @Field(() => Int)
  id: number;

  @Field(() => ContactDto)
  contact: ContactDto;

  @Field(() => Int)
  unreadCount: number;

  @Field(() => [MessageDto])
  messages: MessageDto[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
