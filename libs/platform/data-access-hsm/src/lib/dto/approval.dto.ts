import { ChannelDto } from '@zxcdesu/data-access-channel';
import { Approval, ApprovalStatus } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';

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
