import { registerEnumType } from '@nestjs/graphql';

export enum ChannelStatus {
  Connecting = 'Connecting',
  Connected = 'Connected',
  Failed = 'Failed',
}

registerEnumType(ChannelStatus, {
  name: 'ChannelStatus',
});
