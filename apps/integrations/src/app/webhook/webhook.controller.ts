import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateWebhookDto } from '../webhook/dto/create-webhook.dto';
import { UpdateWebhookDto } from '../webhook/dto/update-webhook.dto';
import { WebhookDto } from '../webhook/dto/webhook.dto';
import { ReceiveWebhookDto } from './dto/receive-webhook.dto';
import { WebhookService } from './webhook.service';

@Controller()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'createWebhook',
    queue: 'createWebhook',
  })
  @SerializeOptions({
    type: WebhookDto,
  })
  create(@RabbitPayload() payload: CreateWebhookDto) {
    return this.webhookService.create(payload);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'findOneWebhook',
    queue: 'findOneWebhook',
  })
  @SerializeOptions({
    type: WebhookDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.webhookService.findOne(projectId, id);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'findAllWebhooks',
    queue: 'findAllWebhooks',
  })
  @SerializeOptions({
    type: WebhookDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.webhookService.findAll(projectId);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'updateWebhook',
    queue: 'updateWebhook',
  })
  @SerializeOptions({
    type: WebhookDto,
  })
  update(@RabbitPayload() payload: UpdateWebhookDto) {
    return this.webhookService.update(payload);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'removeWebhook',
    queue: 'removeWebhook',
  })
  @SerializeOptions({
    type: WebhookDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.webhookService.remove(projectId, id);
  }

  @RabbitRPC({
    exchange: 'integrations',
    routingKey: 'sendWebhooks',
    queue: 'sendWebhook',
  })
  sendWebhooks(@RabbitPayload() payload: ReceiveWebhookDto) {
    return this.webhookService.send(payload);
  }
}
