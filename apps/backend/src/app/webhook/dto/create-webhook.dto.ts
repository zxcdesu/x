import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateWebhookDto {
  @Field(() => String)
  name: string;
}
