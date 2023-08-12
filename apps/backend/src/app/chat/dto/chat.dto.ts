import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatDto {
  @Field(() => Int)
  id: number;
}
