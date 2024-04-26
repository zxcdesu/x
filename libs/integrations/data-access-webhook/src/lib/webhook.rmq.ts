import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateWebhookDto, UpdateWebhookDto, WebhookDto } from './dto';

@Injectable()
export class WebhookRmq<
  T extends Partial<StringifyDate<WebhookDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'webhooks',
      routingKey: 'createWebhook',
      queue: 'createWebhook',
    });
  }

  create(projectId: number, payload: CreateWebhookDto) {
    return this.request<T>({
      exchange: 'webhooks',
      routingKey: 'createWebhook',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'findOneWebhook',
      queue: 'findOneWebhook',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'findOneWebhook',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'findAllWebhooks',
      queue: 'findAllWebhooks',
    });
  }

  findAll(projectId: number) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'findAllWebhooks',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'findOneWebhook',
      queue: 'findOneWebhook',
    });
  }

  update(projectId: number, id: number, payload: UpdateWebhookDto) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'findOneWebhook',
      payload: {
        projectId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'removeWebhook',
      queue: 'removeWebhook',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'removeWebhook',
      payload: {
        projectId,
        id,
      },
    });
  }
}
