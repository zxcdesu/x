import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateInviteDto {
  @Field(() => String)
  email: string;

  @Field(() => Int)
  projectId: number;
}
