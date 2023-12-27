import { registerEnumType } from '@nestjs/graphql';

export enum ChannelType {
  Gupshup = 'Gupshup',
  Instagram = 'Instagram',
  Telegram = 'Telegram',
  Viber = 'Viber',
  Vkontakte = 'Vkontakte',
  Web = 'Web',
}

registerEnumType(ChannelType, {
  name: 'ChannelType',
});
