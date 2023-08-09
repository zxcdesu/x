import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateUserDto {
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
