import { ArgsType, Field } from '@nestjs/graphql';
import { ChannelType } from './channel-type.enum';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class CreateChannelDto {
  @Field(() => String)
  name: string;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field(() => String)
  accountId: string;

  @Field(() => GraphQLJSON)
  token: any;
}
