import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class BotDto {
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
