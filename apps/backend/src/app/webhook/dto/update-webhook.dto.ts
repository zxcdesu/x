import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateWebhookDto } from './create-webhook.dto';

@ArgsType()
export class UpdateWebhookDto extends PartialType(CreateWebhookDto) {
  @Field(() => Int)
  id: number;
}
