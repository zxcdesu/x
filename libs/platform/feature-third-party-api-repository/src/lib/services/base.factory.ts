import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { FactoryOptions } from '../interfaces';
import { BaseChannelManager } from './base-channel.manager';
import { BaseChatManager } from './base-chat.manager';
import { BaseMessageManager } from './base-message.manager';

export abstract class BaseFactory {
  constructor(
    protected readonly options: FactoryOptions,
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
  ) {}

  abstract factoryChannel(): BaseChannelManager;

  abstract factoryChat(): BaseChatManager;

  abstract factoryMessage(): BaseMessageManager;
}
