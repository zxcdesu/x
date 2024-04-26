import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ChannelDto } from '@zxcdesu/data-access-channel';
import { StringifyDate } from '@zxcdesu/util-types';
import { ChannelStatus } from './channel-status.enum';
import { ChannelType } from './channel-type.enum';

@ObjectType()
export class ChannelObject
  implements
    Omit<StringifyDate<ChannelDto>, 'projectId' | 'externalId' | 'token'>
{
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field(() => ChannelStatus)
  status: ChannelStatus;

  @Field(() => String, { nullable: true })
  failedReason: string | null;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
