import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NotificationSubscriberDto {
  @Field(() => [String])
  types: string[];
}
