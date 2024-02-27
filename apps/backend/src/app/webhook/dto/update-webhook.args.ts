import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import type { UpdateWebhookDto } from '@zxcdesu/data-access-webhook';
import { CreateWebhookArgs } from './create-webhook.args';

@ArgsType()
export class UpdateWebhookArgs
  extends PartialType(CreateWebhookArgs)
  implements UpdateWebhookDto
{
  @Field(() => Int)
  id: number;
}
