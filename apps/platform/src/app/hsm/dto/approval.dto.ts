import { Exclude, Type } from 'class-transformer';
import { ChannelDto } from '../../channel/dto/channel.dto';
import { Approval, ApprovalStatus } from '../../prisma.service';

export class ApprovalDto implements Approval {
  @Exclude()
  channelId: number;

  @Type(() => ChannelDto)
  channel: ChannelDto;

  @Exclude()
  hsmId: number;

  @Exclude()
  externalId: string;

  status: ApprovalStatus;

  rejectedReason: string | null;
}
