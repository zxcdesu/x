import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { UpdateSubscriptionDto } from '@zxcdesu/data-access-subscription';
import { CreateSubscriptionArgs } from './create-subscription.args';

@ArgsType()
export class UpdateSubscriptionArgs
  extends PartialType(CreateSubscriptionArgs)
  implements Omit<UpdateSubscriptionDto, 'expiresAt'>
{
  @Field(() => Int)
  id: number;
}
