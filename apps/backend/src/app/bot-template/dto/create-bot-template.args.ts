import { ArgsType, Field } from '@nestjs/graphql';
import type { CreateBotTemplateDto } from '@zxcdesu/data-access-bot-template';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Category } from './category.enum';

@ArgsType()
export class CreateBotTemplateArgs implements CreateBotTemplateDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => GraphQLJSONObject)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flow: any;
}
