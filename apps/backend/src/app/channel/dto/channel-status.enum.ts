import { registerEnumType } from '@nestjs/graphql';

export enum ChannelStatus {
  Connecting = 'Connecting',
  Active = 'Active',
  Failed = 'Failed',
}

registerEnumType(ChannelStatus, {
  name: 'ChannelStatus',
});
