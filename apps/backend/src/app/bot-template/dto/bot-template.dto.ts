import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Category } from './category.enum';

@ObjectType()
export class BotTemplateDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => Category)
  category: Category;

  @Field(() => GraphQLJSONObject)
  flow: any;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
