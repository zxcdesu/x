import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { ViberChannelManager } from './viber-channel.manager';
import { ViberChatManager } from './viber-chat.manager';
import { ViberMessageManager } from './viber-message.manager';

export class ViberFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new ViberChannelManager(this.httpService);
  }

  override factoryChat(): BaseChatManager {
    return new ViberChatManager(this.httpService);
  }

  override factoryMessage(): BaseMessageManager {
    return new ViberMessageManager(this.httpService);
  }
}
