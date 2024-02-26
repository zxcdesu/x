import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { WebhookDto } from './dto/webhook.dto';

@Injectable()
export class WebhookRmq extends RmqService {
  create(projectId: number, payload: CreateWebhookDto) {
    return this.request<WebhookDto>({
      exchange: 'integrations',
      routingKey: 'createWebhook',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<WebhookDto>({
      exchange: 'integrations',
      routingKey: 'findOneWebhook',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number) {
    return this.request<WebhookDto[]>({
      exchange: 'integrations',
      routingKey: 'findAllWebhooks',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateWebhookDto) {
    return this.request<WebhookDto>({
      exchange: 'integrations',
      routingKey: 'updateWebhook',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<WebhookDto>({
      exchange: 'integrations',
      routingKey: 'removeWebhook',
      payload: {
        projectId,
        id,
      },
    });
  }
}
