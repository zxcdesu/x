import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { GupshupChannelManager } from './gupshup-channel.manager';
import { GupshupChatManager } from './gupshup-chat.manager';
import { GupshupMessageManager } from './gupshup-message.manager';

export class GupshupFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new GupshupChannelManager(this.httpService);
  }

  override factoryChat(): BaseChatManager {
    return new GupshupChatManager(this.httpService);
  }

  override factoryMessage(): BaseMessageManager {
    return new GupshupMessageManager(this.httpService);
  }
}
