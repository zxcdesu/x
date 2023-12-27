import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionDto {
  @Field(() => String)
  expiresAt: string;
}
