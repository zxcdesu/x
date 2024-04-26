import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { UserDto } from '@zxcdesu/data-access-user';
import { StringifyDate } from '@zxcdesu/util-types';

@ObjectType()
export class UserObject implements Omit<StringifyDate<UserDto>, 'password'> {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  imageUrl: string | null;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  emailConfirmed: boolean;

  @Field(() => String, { nullable: true })
  phone: string | null;

  @Field(() => Boolean)
  phoneConfirmed: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
