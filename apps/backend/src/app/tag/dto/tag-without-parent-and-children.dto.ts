import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagWithoutParentAndChildrenDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
