import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { WebhookDto } from '@zxcdesu/data-access-webhook';
import { WebhookType } from './webhook-type.enum';

@ObjectType()
export class WebhookObject implements Omit<WebhookDto, 'projectId'> {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => WebhookType)
  type: WebhookType;
}
