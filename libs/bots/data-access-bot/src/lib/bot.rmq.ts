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
      exchange: 'bots',
      routingKey: 'createBot',
      queue: 'createBot',
    });
  }

  create(projectId: number, payload: CreateBotDto) {
    return this.request<T>({
      exchange: 'bots',
      routingKey: 'createBot',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'bots',
      routingKey: 'findOneBot',
      queue: 'findOneBot',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'bots',
      routingKey: 'findOneBot',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'bots',
      routingKey: 'findAllBots',
      queue: 'findAllBots',
    });
  }

  findAll(projectId: number) {
    return this.request<T[]>({
      exchange: 'bots',
      routingKey: 'findAllBots',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'bots',
      routingKey: 'findOneBot',
      queue: 'findOneBot',
    });
  }

  update(projectId: number, id: number, payload: UpdateBotDto) {
    return this.request<T>({
      exchange: 'bots',
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
      exchange: 'bots',
      routingKey: 'removeBot',
      queue: 'removeBot',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'bots',
      routingKey: 'removeBot',
      payload: {
        projectId,
        id,
      },
    });
  }
}
