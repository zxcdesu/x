import { ArgsType, Field } from '@nestjs/graphql';
import type { CreateUserDto } from '@zxcdesu/data-access-user';

@ArgsType()
export class CreateUserArgs implements CreateUserDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String)
  password: string;
}
