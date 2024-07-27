import { ArgsType, Field } from '@nestjs/graphql';
import type { CreateChannelDto } from '@zxcdesu/data-access-channel';
import { GraphQLJSON } from 'graphql-type-json';
import { ChannelType } from './channel-type.enum';

@ArgsType()
export class CreateChannelArgs implements CreateChannelDto {
  @Field(() => String)
  name: string;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field(() => String)
  externalId: string;

  @Field(() => GraphQLJSON)
  token: any;
}
