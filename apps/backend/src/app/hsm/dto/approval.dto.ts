import { Field, ObjectType } from '@nestjs/graphql';
import { ChannelObject } from '../../channel/dto/channel.object';
import { ApprovalStatus } from './approval-status.enum';

@ObjectType()
export class ApprovalDto {
  @Field(() => ChannelObject)
  channel: ChannelObject;

  @Field(() => ApprovalStatus)
  status: ApprovalStatus;

  @Field(() => String, { nullable: true })
  rejectedReason: string | null;
}
