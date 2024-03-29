import { HttpService } from '@nestjs/axios';
import { BaseChannelManager } from './base-channel.manager';
import { BaseChatManager } from './base-chat.manager';
import { BaseMessageManager } from './base-message.manager';

export abstract class BaseFactory {
  constructor(protected readonly httpService: HttpService) {}

  abstract factoryChannel(): BaseChannelManager;

  abstract factoryChat(): BaseChatManager;

  abstract factoryMessage(): BaseMessageManager;
}
