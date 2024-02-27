import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateWebhookArgs } from './dto/create-webhook.args';
import { UpdateWebhookArgs } from './dto/update-webhook.args';
import { WebhookObject } from './dto/webhook.object';

@Injectable()
export class WebhookRmq extends RmqService {
  create(projectId: number, payload: CreateWebhookArgs) {
    return this.request<WebhookObject>({
      exchange: 'integrations',
      routingKey: 'createWebhook',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<WebhookObject>({
      exchange: 'integrations',
      routingKey: 'findOneWebhook',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number) {
    return this.request<WebhookObject[]>({
      exchange: 'integrations',
      routingKey: 'findAllWebhooks',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateWebhookArgs) {
    return this.request<WebhookObject>({
      exchange: 'integrations',
      routingKey: 'updateWebhook',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<WebhookObject>({
      exchange: 'integrations',
      routingKey: 'removeWebhook',
      payload: {
        projectId,
        id,
      },
    });
  }
}
