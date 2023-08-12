import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateContactDto {
  @Field(() => String)
  name: string;
}
