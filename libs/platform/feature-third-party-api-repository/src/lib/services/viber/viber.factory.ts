import { BaseChannelManager } from '../base-channel.manager';
import { BaseChatManager } from '../base-chat.manager';
import { BaseMessageManager } from '../base-message.manager';
import { BaseFactory } from '../base.factory';
import { ViberChannelManager } from './viber-channel.manager';
import { ViberChatManager } from './viber-chat.manager';
import { ViberMessageManager } from './viber-message.manager';
import { ViberClient } from './viber.client';

export class ViberFactory extends BaseFactory {
  override factoryChannel(): BaseChannelManager<unknown> {
    return new ViberChannelManager(
      new ViberClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryChat(): BaseChatManager {
    return new ViberChatManager(
      new ViberClient(this.options, this.httpService),
      this.configService,
    );
  }

  override factoryMessage(): BaseMessageManager {
    return new ViberMessageManager(
      new ViberClient(this.options, this.httpService),
      this.configService,
    );
  }
}
