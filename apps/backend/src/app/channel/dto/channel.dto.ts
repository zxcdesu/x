import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChannelDto {
  @Field(() => Int)
  id: number;
}
