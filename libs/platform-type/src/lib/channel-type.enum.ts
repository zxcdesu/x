export const ChannelType = {
  Gupshup: 'Gupshup',
  Instagram: 'Instagram',
  Telegram: 'Telegram',
  Viber: 'Viber',
  Vkontakte: 'Vkontakte',
  Web: 'Web',
} as const;

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType];
