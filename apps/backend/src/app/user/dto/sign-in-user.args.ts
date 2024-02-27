import { ArgsType, Field } from '@nestjs/graphql';
import type { SignInUserDto } from '@zxcdesu/feature-user-auth';

@ArgsType()
export class SignInUserArgs implements SignInUserDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
