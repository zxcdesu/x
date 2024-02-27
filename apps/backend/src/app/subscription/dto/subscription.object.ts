import { Field, ObjectType } from '@nestjs/graphql';
import { SubscriptionDto } from '@zxcdesu/data-access-subscription';

@ObjectType()
export class SubscriptionObject
  implements Omit<SubscriptionDto, 'projectId' | 'expiresAt'>
{
  @Field(() => String)
  expiresAt: string;
}
