import { ConfigService } from '@nestjs/config';
import {
  ChatPayload,
  RemoveChatPayload,
  UpsertChatPayload,
} from '../interfaces';
import { BaseClient } from './base.client';

export abstract class BaseChatManager {
  constructor(
    protected readonly client: BaseClient,
    protected readonly configService: ConfigService,
  ) {}

  /**
   * Для правильной инициализации чата на стороне внешнего api
   *
   * Например, вызов *optIn* в *gupshup*
   */
  abstract upsert(payload: UpsertChatPayload): Promise<ChatPayload>;

  /**
   * Для правильной де-инициализации чата на стороне внешнего api
   *
   * Например, вызов *optOut* в *gupshup*
   */
  abstract remove(payload: RemoveChatPayload): Promise<void>;
}
