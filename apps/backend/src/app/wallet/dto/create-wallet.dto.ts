import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateWalletDto {
  @Field(() => String)
  name: string;
}
