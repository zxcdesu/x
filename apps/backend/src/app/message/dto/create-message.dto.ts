import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateMessageDto {
  @Field(() => String)
  name: string;
}
