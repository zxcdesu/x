import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagDto {
  @Field(() => Int)
  id: number;
}
