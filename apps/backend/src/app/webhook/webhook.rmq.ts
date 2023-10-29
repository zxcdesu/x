import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
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
        ...payload,
        projectId,
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

  findAll(projectId: number, ids?: number[]) {
    return this.request<WebhookDto[]>({
      exchange: 'integrations',
      routingKey: 'findAllWebhooks',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateWebhookDto) {
    return this.request<WebhookDto>({
      exchange: 'integrations',
      routingKey: 'updateWebhook',
      payload: {
        ...payload,
        projectId,
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
