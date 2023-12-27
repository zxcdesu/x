import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateChatDto {
  @Field(() => Int)
  channelId: number;

  @Field(() => Int)
  contactId: number;

  @Field(() => String)
  accountId: string;
}
