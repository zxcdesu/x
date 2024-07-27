import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { UserDto } from '@zxcdesu/data-access-user';

@ObjectType()
export class UserObject implements UserDto {
  @Field(() => Int)
  id: number;
}
