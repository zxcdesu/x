import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { CreateHsmDto, HsmDto, UpdateHsmDto } from './dto';

@Injectable()
export class HsmRmq<T extends Partial<HsmDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createHsm',
      queue: 'createHsm',
    });
  }

  create(projectId: number, payload: CreateHsmDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createHsm',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneHsm',
      queue: 'findOneHsm',
    });
  }

  findOne(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneHsm',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllHsms',
      queue: 'findAllHsms',
    });
  }

  findAll(projectId: number): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'platform',
      routingKey: 'findAllHsms',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'updateHsm',
      queue: 'updateHsm',
    });
  }

  update(projectId: number, id: number, payload: UpdateHsmDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'updateHsm',
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
      routingKey: 'removeHsm',
      queue: 'removeHsm',
    });
  }

  remove(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeHsm',
      payload: {
        projectId,
        id,
      },
    });
  }
}
