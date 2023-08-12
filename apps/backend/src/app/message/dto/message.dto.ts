import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageDto {
  @Field(() => Int)
  id: number;
}
