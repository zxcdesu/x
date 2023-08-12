import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateMailingDto {
  @Field(() => String)
  name: string;
}
