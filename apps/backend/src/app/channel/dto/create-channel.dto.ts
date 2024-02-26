import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { ChannelType } from './channel-type.enum';

@ArgsType()
export class CreateChannelDto {
  @Field(() => String)
  name: string;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field(() => String)
  externalId: string;

  @Field(() => GraphQLJSON)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;
}
