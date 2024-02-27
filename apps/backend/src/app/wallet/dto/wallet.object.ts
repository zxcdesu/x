import { Field, ObjectType } from '@nestjs/graphql';
import { WalletDto } from '@zxcdesu/data-access-wallet';

@ObjectType()
export class WalletObject
  implements Omit<WalletDto, 'projectId' | 'currentBalance'>
{
  @Field(() => String)
  country: string;

  @Field(() => String)
  currency: string;

  @Field(() => Number)
  currentBalance: number;
}
