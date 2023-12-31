import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateWebhookDto } from '../webhook/dto/create-webhook.dto';
import { UpdateWebhookDto } from '../webhook/dto/update-webhook.dto';
import { WebhookDto } from '../webhook/dto/webhook.dto';
import { WebhookService } from './webhook.service';

@Controller()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @RabbitRPC({
    routingKey: 'createWebhook',
    exchange: 'integrations',
  })
  @SerializeOptions({
    type: WebhookDto,
  })
  create(@RabbitPayload() payload: CreateWebhookDto) {
    return this.webhookService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneWebhook',
    exchange: 'integrations',
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
    routingKey: 'findAllWebhooks',
    exchange: 'integrations',
  })
  @SerializeOptions({
    type: WebhookDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.webhookService.findAll(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateWebhook',
    exchange: 'integrations',
  })
  @SerializeOptions({
    type: WebhookDto,
  })
  update(@RabbitPayload() payload: UpdateWebhookDto) {
    return this.webhookService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeWebhook',
    exchange: 'integrations',
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
}
