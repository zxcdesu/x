import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ChannelDto } from '@zxcdesu/data-access-channel';
import { Type } from 'class-transformer';
import { ChannelStatus } from './channel-status.enum';
import { ChannelType } from './channel-type.enum';

@ObjectType()
export class ChannelObject
  implements Omit<ChannelDto, 'projectId' | 'externalId' | 'token'>
{
  @Field(() => Int)
  id: number;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field(() => String)
  name: string;

  @Field(() => ChannelStatus)
  status: ChannelStatus;

  @Field(() => String, { nullable: true })
  failedReason: string | null;

  @Type(() => Date)
  @Field(() => String)
  createdAt: Date;

  @Type(() => Date)
  @Field(() => String)
  updatedAt: Date;
}
