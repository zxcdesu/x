import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateWalletDto } from './create-wallet.dto';

@ArgsType()
export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  @Field(() => Int)
  id: number;
}
