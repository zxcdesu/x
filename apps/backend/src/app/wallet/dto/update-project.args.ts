import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import type { UpdateWalletDto } from '@zxcdesu/data-access-wallet';
import { CreateWalletArgs } from './create-wallet.args';

@ArgsType()
export class UpdateWalletArgs
  extends PartialType(CreateWalletArgs)
  implements UpdateWalletDto
{
  @Field(() => Int)
  id: number;
}
