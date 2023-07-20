import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';

@Injectable()
export class BotRmq extends RmqService {
  private readonly exchange = 'bots';

  create(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'createBot',
      payload,
    });
  }

  findOne(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'findOneBot',
      payload,
    });
  }

  findAll(payload?: number[]) {
    return this.request<any[]>({
      exchange: this.exchange,
      routingKey: 'findAllBots',
      payload,
    });
  }

  update(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'updateBot',
      payload,
    });
  }

  remove(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'removeBot',
      payload,
    });
  }
}
