import { Exclude } from 'class-transformer';
import { Channel, ChannelStatus, ChannelType } from '../../prisma.service';

export class ChannelDto implements Channel {
  id: number;

  @Exclude()
  projectId: number;

  type: ChannelType;

  name: string;

  @Exclude()
  accountId: string;

  @Exclude()
  token: any;

  status: ChannelStatus;

  failedReason: string | null;

  createdAt: Date;

  updatedAt: Date;
}
