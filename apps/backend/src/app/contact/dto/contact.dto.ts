import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactDto {
  @Field(() => Int)
  id: number;
}
