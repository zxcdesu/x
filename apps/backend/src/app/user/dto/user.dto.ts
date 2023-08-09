import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  emailConfirmed: boolean;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => Boolean)
  phoneConfirmed: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
