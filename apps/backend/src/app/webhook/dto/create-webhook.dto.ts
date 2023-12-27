import { ArgsType, Field } from '@nestjs/graphql';
import { WebhookEventType } from './webhook-event-type.enum';

@ArgsType()
export class CreateWebhookDto {
  @Field(() => WebhookEventType)
  eventType: WebhookEventType;

  @Field(() => String)
  url: string;
}
