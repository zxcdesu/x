import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { InstagramChannelManager } from './instagram-channel.manager';
import { InstagramChatManager } from './instagram-chat.manager';
import { InstagramMessageManager } from './instagram-message.manager';
import { InstagramClient } from './instagram.client';

export class InstagramFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new InstagramChannelManager(
      new InstagramClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryChat(): BaseChatManager {
    return new InstagramChatManager(
      new InstagramClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryMessage(): BaseMessageManager {
    return new InstagramMessageManager(
      new InstagramClient(this.options, this.httpService),
      this.configService,
    );
  }
}
