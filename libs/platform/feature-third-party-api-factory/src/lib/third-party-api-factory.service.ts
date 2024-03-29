import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ChannelType } from '@zxcdesu/prisma-platform';
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
export class ThirdPartyApiFactoryService
  implements Record<ChannelType, typeof BaseFactory>
{
  [ChannelType.Gupshup] = GupshupFactory;
  [ChannelType.Instagram] = InstagramFactory;
  [ChannelType.Telegram] = TelegramFactory;
  [ChannelType.Viber] = ViberFactory;
  [ChannelType.Vkontakte] = VkontakteFactory;
  [ChannelType.Webapp] = WebappFactory;

  constructor(private readonly httpService: HttpService) {}

  factory(options: FactoryOptions): BaseFactory {
    return new this[options.type](this.httpService);
  }
}
