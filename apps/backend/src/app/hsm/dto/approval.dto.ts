import { Field, ObjectType } from '@nestjs/graphql';
import { ChannelDto } from '../../channel/dto/channel.dto';
import { ApprovalStatus } from './approval-status.enum';

@ObjectType()
export class ApprovalDto {
  @Field(() => ApprovalStatus)
  status: ApprovalStatus;

  @Field(() => String, { nullable: true })
  rejectedReason: string | null;

  @Field(() => ChannelDto)
  channel: ChannelDto;
}
