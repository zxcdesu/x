import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { WebappChannelManager } from './webapp-channel.manager';
import { WebappChatManager } from './webapp-chat.manager';
import { WebappMessageManager } from './webapp-message.manager';
import { WebappClient } from './webapp.client';

export class WebappFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new WebappChannelManager(
      new WebappClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryChat(): BaseChatManager {
    return new WebappChatManager(
      new WebappClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryMessage(): BaseMessageManager {
    return new WebappMessageManager(
      new WebappClient(this.options, this.httpService),
      this.configService,
    );
  }
}
