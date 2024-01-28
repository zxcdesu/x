import { Field, Int, ObjectType } from '@nestjs/graphql';
import { WebhookType } from './webhook-type.enum';

@ObjectType()
export class WebhookDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => WebhookType)
  type: WebhookType;
}
