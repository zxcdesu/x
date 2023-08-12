import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateBotDto {
  @Field(() => String)
  name: string;
}
