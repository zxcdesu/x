import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionDto {
  @Field(() => Int)
  id: number;
}
