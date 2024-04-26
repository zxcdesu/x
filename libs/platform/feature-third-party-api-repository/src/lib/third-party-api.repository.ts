import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ChannelType } from '@zxcdesu/prisma-platform';
import { UnknownChannelException } from './exceptions';
import { FactoryOptions } from './interfaces';
import {
  GupshupFactory,
  InstagramFactory,
  TelegramFactory,
  ViberFactory,
  VkontakteFactory,
  WebappFactory,
} from './services';
import { BaseFactory } from './services/base.factory';

@Injectable()
export class ThirdPartyApiRepository
  implements Record<ChannelType, typeof BaseFactory>
{
  [ChannelType.Gupshup] = GupshupFactory;
  [ChannelType.Instagram] = InstagramFactory;
  [ChannelType.Telegram] = TelegramFactory;
  [ChannelType.Viber] = ViberFactory;
  [ChannelType.Vkontakte] = VkontakteFactory;
  [ChannelType.Webapp] = WebappFactory;

  constructor(private readonly httpService: HttpService) {}

  getOrThrow(options: FactoryOptions): BaseFactory {
    if (!this[options.type]) {
      throw new UnknownChannelException();
    }
    return new this[options.type](options, this.httpService);
  }
}
