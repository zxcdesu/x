import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';

@Injectable()
export class WebhookRmq extends RmqService {
  private readonly exchange = 'integrations';

  create(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'createWebhook',
      payload,
    });
  }

  findOne(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'findOneWebhook',
      payload,
    });
  }

  findAll(payload?: number[]) {
    return this.request<any[]>({
      exchange: this.exchange,
      routingKey: 'findAllWebhooks',
      payload,
    });
  }

  update(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'updateWebhook',
      payload,
    });
  }

  remove(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'removeWebhook',
      payload,
    });
  }
}
