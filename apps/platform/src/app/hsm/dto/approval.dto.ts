import { Exclude, Type } from 'class-transformer';
import { Approval, ApprovalStatus } from '../../prisma.service';
import { ChannelDto } from '../../channel/dto/channel.dto';

export class ApprovalDto implements Approval {
  @Exclude()
  hsmId: number;

  @Exclude()
  channelId: number;

  status: ApprovalStatus;

  rejectedReason: string | null;

  @Exclude()
  externalId: string;

  @Type(() => ChannelDto)
  channel: ChannelDto;
}
