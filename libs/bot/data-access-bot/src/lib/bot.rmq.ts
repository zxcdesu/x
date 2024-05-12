import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { BotDto, CreateBotDto, UpdateBotDto } from './dto';

@Injectable()
export class BotRmq<
  T extends Partial<StringifyDate<BotDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'bot',
      routingKey: 'createBot',
      queue: 'createBot',
    });
  }

  create(projectId: number, payload: CreateBotDto) {
    return this.request<T>({
      exchange: 'bot',
      routingKey: 'createBot',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'bot',
      routingKey: 'findOneBot',
      queue: 'findOneBot',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'bot',
      routingKey: 'findOneBot',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'bot',
      routingKey: 'findAllBots',
      queue: 'findAllBots',
    });
  }

  findAll(projectId: number) {
    return this.request<T[]>({
      exchange: 'bot',
      routingKey: 'findAllBots',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'bot',
      routingKey: 'findOneBot',
      queue: 'findOneBot',
    });
  }

  update(projectId: number, id: number, payload: UpdateBotDto) {
    return this.request<T>({
      exchange: 'bot',
      routingKey: 'findOneBot',
      payload: {
        projectId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'bot',
      routingKey: 'removeBot',
      queue: 'removeBot',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'bot',
      routingKey: 'removeBot',
      payload: {
        projectId,
        id,
      },
    });
  }
}
