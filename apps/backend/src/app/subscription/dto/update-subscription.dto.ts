import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSubscriptionDto } from './create-subscription.dto';

@ArgsType()
export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @Field(() => Int)
  id: number;
}
