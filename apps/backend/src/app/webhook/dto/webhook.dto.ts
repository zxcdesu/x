import { Field, Int, ObjectType } from '@nestjs/graphql';
import { WebhookEventType } from './webhook-event-type.enum';

@ObjectType()
export class WebhookDto {
  @Field(() => Int)
  id: number;

  @Field(() => WebhookEventType)
  eventType: WebhookEventType;

  @Field(() => String)
  url: string;
}
