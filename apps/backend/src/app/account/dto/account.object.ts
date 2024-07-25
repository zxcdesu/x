import { Field, ObjectType } from '@nestjs/graphql';
import type { AccountDto } from '@zxcdesu/data-access-account';

@ObjectType()
export class AccountObject implements AccountDto {
  @Field(() => String)
  id: string;
}
