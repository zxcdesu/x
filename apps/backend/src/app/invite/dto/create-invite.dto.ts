import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateInviteDto {
  @Field(() => String)
  email: string;
}
