import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { TelegramChannelManager } from './telegram-channel.manager';
import { TelegramChatManager } from './telegram-chat.manager';
import { TelegramMessageManager } from './telegram-message.manager';
import { TelegramClient } from './telegram.client';

export class TelegramFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new TelegramChannelManager(
      new TelegramClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryChat(): BaseChatManager {
    return new TelegramChatManager(
      new TelegramClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryMessage(): BaseMessageManager {
    return new TelegramMessageManager(
      new TelegramClient(this.options, this.httpService),
      this.configService,
    );
  }
}
