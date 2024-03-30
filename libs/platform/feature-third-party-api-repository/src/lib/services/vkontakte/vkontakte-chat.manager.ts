import { NotImplementedException } from '@nestjs/common';
import {
  ChatPayload,
  RemoveChatPayload,
  UpsertChatPayload,
} from '../../interfaces';
import { BaseChatManager } from '../base-chat.manager';

export class VkontakteChatManager extends BaseChatManager {
  override upsert(payload: UpsertChatPayload): Promise<ChatPayload> {
    throw new NotImplementedException({
      payload,
    });
  }

  override remove(payload: RemoveChatPayload): Promise<void> {
    throw new NotImplementedException({
      payload,
    });
  }
}
