import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateChannelDto {
  @Field(() => String)
  name: string;
}
