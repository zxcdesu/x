import { Exclude } from 'class-transformer';
import { Channel, ChannelStatus, ChannelType } from '../../prisma.service';

export class ChannelDto implements Channel {
  id: number;

  @Exclude()
  projectId: number;

  type: ChannelType;

  name: string;

  @Exclude()
  externalId: string;

  @Exclude()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;

  status: ChannelStatus;

  failedReason: string | null;

  createdAt: Date;

  updatedAt: Date;
}
