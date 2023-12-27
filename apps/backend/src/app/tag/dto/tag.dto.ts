import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class TagDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  color: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  parent?: Omit<TagDto, 'parent' | 'children'>;

  @Field(() => [GraphQLJSONObject])
  children: Omit<TagDto, 'parent' | 'children'>[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
