import { ArgsType, Field, Int } from '@nestjs/graphql';
import type { CreateChatDto } from '@zxcdesu/data-access-chat';

@ArgsType()
export class CreateChatArgs implements CreateChatDto {
  @Field(() => Int)
  channelId: number;

  @Field(() => Int)
  contactId: number;

  @Field(() => String)
  externalId: string;
}
