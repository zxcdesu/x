import { ArgsType, Field } from '@nestjs/graphql';
import type { CreateSubscriptionDto } from '@zxcdesu/data-access-subscription';

@ArgsType()
export class CreateSubscriptionArgs
  implements Omit<CreateSubscriptionDto, 'expiresAt'>
{
  @Field(() => String)
  expiresAt: string;
}
