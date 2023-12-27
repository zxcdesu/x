import { Field, ObjectType } from '@nestjs/graphql';
import { ChannelDto } from '../../channel/dto/channel.dto';

@ObjectType()
export class ApprovalDto {
  @Field(() => String)
  status: string;

  @Field(() => String, { nullable: true })
  rejectedReason?: string;

  @Field(() => ChannelDto)
  channel: ChannelDto;
}
