import { ConfigService } from '@nestjs/config';
import {
  CreateMessagePayload,
  MessagePayload,
  RemoveMessagePayload,
  UpdateMessagePayload,
} from '../interfaces';
import { BaseClient } from './base.client';

export abstract class BaseMessageManager {
  constructor(
    protected readonly client: BaseClient,
    protected readonly configService: ConfigService,
  ) {}

  /**
   * Создание сообщения на стороне внешнего api
   */
  abstract create(payload: CreateMessagePayload): Promise<MessagePayload>;

  /**
   * Обновление сообщения на стороне внешнего api
   */
  abstract update(payload: UpdateMessagePayload): Promise<MessagePayload>;

  /**
   * Удаление сообщения на стороне внешнего api
   */
  abstract remove(payload: RemoveMessagePayload): Promise<void>;
}
