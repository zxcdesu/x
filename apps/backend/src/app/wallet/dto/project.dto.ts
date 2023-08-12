import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WalletDto {
  @Field(() => Int)
  id: number;
}
