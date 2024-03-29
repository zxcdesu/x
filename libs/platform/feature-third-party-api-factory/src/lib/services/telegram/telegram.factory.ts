import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { TelegramChannelManager } from './telegram-channel.manager';
import { TelegramChatManager } from './telegram-chat.manager';
import { TelegramMessageManager } from './telegram-message.manager';

export class TelegramFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new TelegramChannelManager(this.httpService);
  }

  override factoryChat(): BaseChatManager {
    return new TelegramChatManager(this.httpService);
  }

  override factoryMessage(): BaseMessageManager {
    return new TelegramMessageManager(this.httpService);
  }
}
