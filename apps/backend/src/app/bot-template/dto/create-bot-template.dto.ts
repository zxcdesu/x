import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Category } from './category.enum';

@ArgsType()
export class CreateBotTemplateDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => GraphQLJSONObject)
  flow: any;
}
