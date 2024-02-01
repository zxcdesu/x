import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubscriberDto {
  @Field(() => [String])
  types: string[];
}
