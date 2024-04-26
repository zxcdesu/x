import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import {
  BotTemplateDto,
  CreateBotTemplateDto,
  UpdateBotTemplateDto,
} from './dto';

@Injectable()
export class BotTemplateRmq<
  T extends Partial<StringifyDate<BotTemplateDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'bots',
      routingKey: 'createBotTemplate',
      queue: 'createBotTemplate',
    });
  }

  create(projectId: number, payload: CreateBotTemplateDto) {
    return this.request<T>({
      exchange: 'bots',
      routingKey: 'createBotTemplate',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'bots',
      routingKey: 'findOneBotTemplate',
      queue: 'findOneBotTemplate',
    });
  }

  findOne(id: number) {
    return this.request<T>({
      exchange: 'bots',
      routingKey: 'findOneBotTemplate',
      payload: {
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'bots',
      routingKey: 'findAllBotTemplates',
      queue: 'findAllBotTemplates',
    });
  }

  findAll() {
    return this.request<T[]>({
      exchange: 'bots',
      routingKey: 'findAllBotTemplates',
      payload: {},
    });
  }

  static update() {
    return this.rpc({
      exchange: 'bots',
      routingKey: 'findOneBotTemplate',
      queue: 'findOneBotTemplate',
    });
  }

  update(projectId: number, id: number, payload: UpdateBotTemplateDto) {
    return this.request<T>({
      exchange: 'bots',
      routingKey: 'findOneBotTemplate',
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
      routingKey: 'removeBotTemplate',
      queue: 'removeBotTemplate',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'bots',
      routingKey: 'removeBotTemplate',
      payload: {
        projectId,
        id,
      },
    });
  }
}
