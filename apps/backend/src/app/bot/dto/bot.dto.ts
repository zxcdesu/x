import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BotDto {
  @Field(() => Int)
  id: number;
}
