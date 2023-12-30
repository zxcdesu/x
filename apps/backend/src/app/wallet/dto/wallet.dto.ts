import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WalletDto {
  @Field(() => String)
  country: string;

  @Field(() => String)
  currency: string;

  @Field(() => Number)
  currentBalance: number;
}
