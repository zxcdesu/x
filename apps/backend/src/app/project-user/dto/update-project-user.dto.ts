import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateProjectUserDto {
  @Field(() => Int)
  userId: number;

  // access
}
