import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { InstagramChannelManager } from './instagram-channel.manager';
import { InstagramChatManager } from './instagram-chat.manager';
import { InstagramMessageManager } from './instagram-message.manager';

export class InstagramFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new InstagramChannelManager(this.httpService);
  }

  override factoryChat(): BaseChatManager {
    return new InstagramChatManager(this.httpService);
  }

  override factoryMessage(): BaseMessageManager {
    return new InstagramMessageManager(this.httpService);
  }
}
