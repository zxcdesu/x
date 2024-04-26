import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { ChatDto, CreateChatDto, UpdateChatDto } from './dto';

@Injectable()
export class ChatRmq<
  T extends Partial<StringifyDate<ChatDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createChat',
      queue: 'createChat',
    });
  }

  create(projectId: number, payload: CreateChatDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createChat',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneChat',
      queue: 'findOneChat',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneChat',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllChats',
      queue: 'findAllChats',
    });
  }

  findAll(projectId: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findAllChats',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneChat',
      queue: 'findOneChat',
    });
  }

  update(projectId: number, id: number, payload: UpdateChatDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneChat',
      payload: {
        projectId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'removeChat',
      queue: 'removeChat',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeChat',
      payload: {
        projectId,
        id,
      },
    });
  }
}
