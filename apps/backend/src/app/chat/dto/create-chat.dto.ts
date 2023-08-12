import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateChatDto {
  @Field(() => String)
  name: string;
}
