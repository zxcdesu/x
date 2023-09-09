import { ArgsType, Field } from '@nestjs/graphql';
import { ChannelType } from '@platform/platform-type';

@ArgsType()
export class CreateChannelDto {
  @Field(() => String)
  name: string;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field(() => String)
  accountId: string;

  @Field(() => String)
  token: string;
}
