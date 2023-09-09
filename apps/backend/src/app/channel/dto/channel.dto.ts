import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ChannelStatus, ChannelType } from '@platform/platform-type';

registerEnumType(ChannelType, {
  name: 'ChannelType',
});

registerEnumType(ChannelStatus, {
  name: 'ChannelStatus',
});

@ObjectType()
export class ChannelDto {
  @Field(() => Int)
  id: number;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field(() => String)
  name: string;

  @Field(() => ChannelStatus)
  status: ChannelStatus;

  @Field(() => String, { nullable: true })
  failedReason?: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
