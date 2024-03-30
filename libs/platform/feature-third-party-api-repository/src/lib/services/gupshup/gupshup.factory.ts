import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { GupshupChannelManager } from './gupshup-channel.manager';
import { GupshupChatManager } from './gupshup-chat.manager';
import { GupshupMessageManager } from './gupshup-message.manager';
import { GupshupClient } from './gupshup.client';

export class GupshupFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new GupshupChannelManager(
      new GupshupClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryChat(): BaseChatManager {
    return new GupshupChatManager(
      new GupshupClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryMessage(): BaseMessageManager {
    return new GupshupMessageManager(
      new GupshupClient(this.options, this.httpService),
      this.configService,
    );
  }
}
