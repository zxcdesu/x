import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateMessageDto, MessageDto, UpdateMessageDto } from './dto';

@Injectable()
export class MessageRmq<
  T extends Partial<StringifyDate<MessageDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createMessage',
      queue: 'createMessage',
    });
  }

  create(projectId: number, payload: CreateMessageDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createMessage',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneMessage',
      queue: 'findOneMessage',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneMessage',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllMessages',
      queue: 'findAllMessages',
    });
  }

  findAll(projectId: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findAllMessages',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneMessage',
      queue: 'findOneMessage',
    });
  }

  update(projectId: number, id: number, payload: UpdateMessageDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneMessage',
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
      routingKey: 'removeMessage',
      queue: 'removeMessage',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeMessage',
      payload: {
        projectId,
        id,
      },
    });
  }
}
