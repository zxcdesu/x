import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ArgsType()
export class CreateBotDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => GraphQLJSONObject)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flow: any;
}
