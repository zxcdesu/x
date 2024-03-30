import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { WebappChannelManager } from './webapp-channel.manager';
import { WebappChatManager } from './webapp-chat.manager';
import { WebappMessageManager } from './webapp-message.manager';

export class WebappFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new WebappChannelManager(this.httpService);
  }

  override factoryChat(): BaseChatManager {
    return new WebappChatManager(this.httpService);
  }

  override factoryMessage(): BaseMessageManager {
    return new WebappMessageManager(this.httpService);
  }
}
