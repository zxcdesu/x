import { registerEnumType } from '@nestjs/graphql';

export const ChannelType = {
  Gupshup: 'Gupshup',
  Instagram: 'Instagram',
  Telegram: 'Telegram',
  Viber: 'Viber',
  Vkontakte: 'Vkontakte',
  Web: 'Web',
} as const;

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType];

registerEnumType(ChannelType, {
  name: 'ChannelType',
});
