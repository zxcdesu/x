import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { CreateMessageDto, MessageDto } from './dto';

@Injectable()
export class MessageRmq<T extends Partial<MessageDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createMessage',
      queue: 'createMessage',
    });
  }

  create(projectId: number, payload: CreateMessageDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createMessage',
      payload: {
        projectId,
        ...payload,
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

  findAll(projectId: number): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'platform',
      routingKey: 'findAllMessages',
      payload: {
        projectId,
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

  remove(projectId: number, id: number): Promise<T> {
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
