import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';

@Injectable()
export class BotTemplateRmq extends RmqService {
  private readonly exchange = 'bots';

  create(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'createBotTemplate',
      payload,
    });
  }

  findOne(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'findOneBotTemplate',
      payload,
    });
  }

  findAll(payload?: number[]) {
    return this.request<any[]>({
      exchange: this.exchange,
      routingKey: 'findAllBotTemplates',
      payload,
    });
  }

  update(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'updateBotTemplate',
      payload,
    });
  }

  remove(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'removeBotTemplate',
      payload,
    });
  }
}
