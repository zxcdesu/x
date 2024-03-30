import { NotImplementedException } from '@nestjs/common';
import {
  ChatPayload,
  CreateChatPayload,
  RemoveChatPayload,
  UpdateChatPayload,
} from '../../interfaces';
import { BaseChatManager } from '../base-chat.manager';

export class GupshupChatManager extends BaseChatManager {
  override create(payload: CreateChatPayload): Promise<ChatPayload> {
    throw new NotImplementedException({
      payload,
    });
  }

  override update(payload: UpdateChatPayload): Promise<ChatPayload> {
    throw new NotImplementedException({
      payload,
    });
  }

  override remove(payload: RemoveChatPayload): Promise<ChatPayload> {
    throw new NotImplementedException({
      payload,
    });
  }
}
