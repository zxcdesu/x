import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { BotDto } from '@zxcdesu/data-access-bot';
import { StringifyDate } from '@zxcdesu/util-types';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class BotObject implements Omit<StringifyDate<BotDto>, 'projectId'> {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  imageUrl: string | null;

  @Field(() => GraphQLJSONObject)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flow: any;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
