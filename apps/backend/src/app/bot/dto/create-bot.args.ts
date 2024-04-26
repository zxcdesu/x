import { ArgsType, Field } from '@nestjs/graphql';
import type { CreateBotDto } from '@zxcdesu/data-access-bot';
import { GraphQLJSONObject } from 'graphql-type-json';

@ArgsType()
export class CreateBotArgs implements CreateBotDto {
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
