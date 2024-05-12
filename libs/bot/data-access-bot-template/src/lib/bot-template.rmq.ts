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
      exchange: 'bot',
      routingKey: 'createBotTemplate',
      queue: 'createBotTemplate',
    });
  }

  create(projectId: number, payload: CreateBotTemplateDto) {
    return this.request<T>({
      exchange: 'bot',
      routingKey: 'createBotTemplate',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'bot',
      routingKey: 'findOneBotTemplate',
      queue: 'findOneBotTemplate',
    });
  }

  findOne(id: number) {
    return this.request<T>({
      exchange: 'bot',
      routingKey: 'findOneBotTemplate',
      payload: {
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'bot',
      routingKey: 'findAllBotTemplates',
      queue: 'findAllBotTemplates',
    });
  }

  findAll() {
    return this.request<T[]>({
      exchange: 'bot',
      routingKey: 'findAllBotTemplates',
      payload: {},
    });
  }

  static update() {
    return this.rpc({
      exchange: 'bot',
      routingKey: 'findOneBotTemplate',
      queue: 'findOneBotTemplate',
    });
  }

  update(projectId: number, id: number, payload: UpdateBotTemplateDto) {
    return this.request<T>({
      exchange: 'bot',
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
      exchange: 'bot',
      routingKey: 'removeBotTemplate',
      queue: 'removeBotTemplate',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'bot',
      routingKey: 'removeBotTemplate',
      payload: {
        projectId,
        id,
      },
    });
  }
}
