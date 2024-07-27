import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { ChannelDto, CreateChannelDto, UpdateChannelDto } from './dto';

@Injectable()
export class ChannelRmq<T extends Partial<ChannelDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createChannel',
      queue: 'createChannel',
    });
  }

  create(projectId: number, payload: CreateChannelDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createChannel',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneChannel',
      queue: 'findOneChannel',
    });
  }

  findOne(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneChannel',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllChannels',
      queue: 'findAllChannels',
    });
  }

  findAll(projectId: number): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'platform',
      routingKey: 'findAllChannels',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'updateChannel',
      queue: 'updateChannel',
    });
  }

  update(projectId: number, id: number, payload: UpdateChannelDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'updateChannel',
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
      routingKey: 'removeChannel',
      queue: 'removeChannel',
    });
  }

  remove(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeChannel',
      payload: {
        projectId,
        id,
      },
    });
  }

  static handle() {
    return this.subscribe({
      exchange: 'platform',
      routingKey: 'handleChannel',
      queue: 'handleChannel',
    });
  }

  handle(projectId: number, id: number): Promise<boolean> {
    return this.publish('platform', 'handleChannel', {
      projectId,
      id,
    });
  }
}
