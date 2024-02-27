import { ArgsType, Field } from '@nestjs/graphql';
import type { CreateWebhookDto } from '@zxcdesu/data-access-webhook';
import { WebhookType } from './webhook-type.enum';

@ArgsType()
export class CreateWebhookArgs implements CreateWebhookDto {
  @Field(() => String)
  url: string;

  @Field(() => WebhookType)
  type: WebhookType;
}
