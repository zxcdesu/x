import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WebhookDto {
  @Field(() => Int)
  id: number;
}
