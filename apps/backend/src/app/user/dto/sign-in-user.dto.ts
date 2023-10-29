import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SignInUserDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
