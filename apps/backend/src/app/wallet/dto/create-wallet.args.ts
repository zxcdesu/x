import { ArgsType, Field } from '@nestjs/graphql';
import type { CreateWalletDto } from '@zxcdesu/data-access-wallet';

@ArgsType()
export class CreateWalletArgs implements CreateWalletDto {
  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  currency?: string;

  @Field(() => Number, { nullable: true })
  currentBalance?: number;
}
