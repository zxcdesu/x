import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { VkontakteChannelManager } from './vkontakte-channel.manager';
import { VkontakteChatManager } from './vkontakte-chat.manager';
import { VkontakteMessageManager } from './vkontakte-message.manager';
import { VkontakteClient } from './vkontakte.client';

export class VkontakteFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new VkontakteChannelManager(
      new VkontakteClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryChat(): BaseChatManager {
    return new VkontakteChatManager(
      new VkontakteClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryMessage(): BaseMessageManager {
    return new VkontakteMessageManager(
      new VkontakteClient(this.options, this.httpService),
      this.configService,
    );
  }
}
