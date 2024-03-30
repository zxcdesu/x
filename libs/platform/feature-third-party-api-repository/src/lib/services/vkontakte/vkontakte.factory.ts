import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { VkontakteChannelManager } from './vkontakte-channel.manager';
import { VkontakteChatManager } from './vkontakte-chat.manager';
import { VkontakteMessageManager } from './vkontakte-message.manager';

export class VkontakteFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new VkontakteChannelManager(this.httpService);
  }

  override factoryChat(): BaseChatManager {
    return new VkontakteChatManager(this.httpService);
  }

  override factoryMessage(): BaseMessageManager {
    return new VkontakteMessageManager(this.httpService);
  }
}
