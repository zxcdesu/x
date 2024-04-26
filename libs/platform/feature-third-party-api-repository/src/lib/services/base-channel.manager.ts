import { ConfigService } from '@nestjs/config';
import { Prisma } from '@zxcdesu/prisma-platform';
import {
  HandleChannelPayload,
  RemoveChannelPayload,
  UpsertChannelPayload,
} from '../interfaces';
import { BaseClient } from './base.client';

export abstract class BaseChannelManager<T = unknown> {
  constructor(
    protected readonly client: BaseClient,
    protected readonly configService: ConfigService,
  ) {}

  /**
   * Для правильной инициализации канала на стороне внешнего api
   *
   * Например, вызов *setWebhook* в *telegram*
   */
  abstract upsert(
    payload: UpsertChannelPayload,
  ): Promise<Prisma.ChannelUpdateInput>;

  /**
   * Для правильной де-инициализации канала на стороне внешнего api
   *
   * Например, вызов *removeWebhook* в *telegram*
   */
  abstract remove(payload: RemoveChannelPayload): Promise<void>;

  /**
   * Трансформация данных, полученных от стороннего api в формат платформы
   */
  abstract handle(
    payload: HandleChannelPayload<T>,
    handle: (payload: unknown) => Promise<void>,
  ): Promise<void>;
}
