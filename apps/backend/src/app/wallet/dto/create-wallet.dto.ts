import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateWalletDto {
  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  currency?: string;

  @Field(() => Number, { nullable: true })
  currentBalance?: number;
}
