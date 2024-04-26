import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/data-access-project';
import {
  CreateWebhookDto,
  UpdateWebhookDto,
  WebhookDto,
  WebhookService,
} from '@zxcdesu/data-access-webhook';
import {
  SendWebhooksDto,
  WebhookSenderService,
} from '@zxcdesu/feature-webhook-sender';

@Controller()
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly webhookSenderService: WebhookSenderService,
  ) {}

  // @RmqService.rpc({
  //   exchange: 'integrations',
  //   routingKey: 'createWebhook',
  //   queue: 'createWebhook',
  // })
  @SerializeOptions({
    type: WebhookDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateWebhookDto,
  ): Promise<WebhookDto> {
    return this.webhookService.create(projectId, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'integrations',
  //   routingKey: 'findOneWebhook',
  //   queue: 'findOneWebhook',
  // })
  @SerializeOptions({
    type: WebhookDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<WebhookDto> {
    return this.webhookService.findOne(projectId, id);
  }

  // @RmqService.rpc({
  //   exchange: 'integrations',
  //   routingKey: 'findAllWebhooks',
  //   queue: 'findAllWebhooks',
  // })
  @SerializeOptions({
    type: WebhookDto,
  })
  findAll(@ProjectId() projectId: number): Promise<WebhookDto[]> {
    return this.webhookService.findAll(projectId);
  }

  // @RmqService.rpc({
  //   exchange: 'integrations',
  //   routingKey: 'updateWebhook',
  //   queue: 'updateWebhook',
  // })
  @SerializeOptions({
    type: WebhookDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateWebhookDto,
  ): Promise<WebhookDto> {
    return this.webhookService.update(projectId, id, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'integrations',
  //   routingKey: 'removeWebhook',
  //   queue: 'removeWebhook',
  // })
  @SerializeOptions({
    type: WebhookDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<WebhookDto> {
    return this.webhookService.remove(projectId, id);
  }

  // @RmqService.subscribe({
  //   exchange: 'integrations',
  //   routingKey: 'sendWebhooks',
  //   queue: 'sendWebhooks',
  // })
  send(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: SendWebhooksDto,
  ): Promise<void> {
    return this.webhookSenderService.send(projectId, payload);
  }
}
