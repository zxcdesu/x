import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { BotTemplateDto } from '@zxcdesu/data-access-bot-template';
import { StringifyDate } from '@zxcdesu/util-types';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Category } from './category.enum';

@ObjectType()
export class BotTemplateObject implements StringifyDate<BotTemplateDto> {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flow: any;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
