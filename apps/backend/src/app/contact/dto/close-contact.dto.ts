import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CloseContactDto {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  closedReason?: string;
}
