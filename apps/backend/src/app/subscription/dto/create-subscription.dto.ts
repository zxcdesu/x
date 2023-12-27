import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateSubscriptionDto {
  @Field(() => String)
  expiresAt: string;
}
