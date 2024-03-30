import { NotImplementedException } from '@nestjs/common';
import {
  CreateMessagePayload,
  MessagePayload,
  RemoveMessagePayload,
  UpdateMessagePayload,
} from '../../interfaces';
import { BaseMessageManager } from '../base-message.manager';

export class ViberMessageManager extends BaseMessageManager {
  override create(payload: CreateMessagePayload): Promise<MessagePayload> {
    throw new NotImplementedException({
      payload,
    });
  }

  override update(payload: UpdateMessagePayload): Promise<MessagePayload> {
    throw new NotImplementedException({
      payload,
    });
  }

  override remove(payload: RemoveMessagePayload): Promise<void> {
    throw new NotImplementedException({
      payload,
    });
  }
}
