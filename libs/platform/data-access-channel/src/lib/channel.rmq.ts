import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { ChannelDto, CreateChannelDto, UpdateChannelDto } from './dto';

@Injectable()
export class ChannelRmq<
  T extends Partial<StringifyDate<ChannelDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createChannel',
      queue: 'createChannel',
    });
  }

  create(projectId: number, payload: CreateChannelDto) {
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

  findOne(projectId: number, id: number) {
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

  findAll(projectId: number) {
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
      routingKey: 'findOneChannel',
      queue: 'findOneChannel',
    });
  }

  update(projectId: number, id: number, payload: UpdateChannelDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneChannel',
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

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeChannel',
      payload: {
        projectId,
        id,
      },
    });
  }
}
