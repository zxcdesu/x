import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HsmDto {
  @Field(() => Int)
  id: number;
}
