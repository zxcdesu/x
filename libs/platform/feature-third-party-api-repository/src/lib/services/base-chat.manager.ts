import { HttpService } from '@nestjs/axios';
import {
  ChatPayload,
  CreateChatPayload,
  RemoveChatPayload,
  UpdateChatPayload,
} from '../interfaces';

export abstract class BaseChatManager {
  constructor(protected readonly httpService: HttpService) {}

  abstract create(payload: CreateChatPayload): Promise<ChatPayload>;

  abstract update(payload: UpdateChatPayload): Promise<ChatPayload>;

  abstract remove(payload: RemoveChatPayload): Promise<ChatPayload>;
}
