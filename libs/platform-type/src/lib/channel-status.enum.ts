export const ChannelStatus = {
  Connecting: 'Connecting',
  Connected: 'Connected',
  Failed: 'Failed',
} as const;

export type ChannelStatus = (typeof ChannelStatus)[keyof typeof ChannelStatus];
