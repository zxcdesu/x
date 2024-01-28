import { ArgsType, Field } from '@nestjs/graphql';
import { WebhookType } from './webhook-type.enum';

@ArgsType()
export class CreateWebhookDto {
  @Field(() => String)
  url: string;

  @Field(() => WebhookType)
  type: WebhookType;
}
