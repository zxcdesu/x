import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { CreateFieldDto, FieldDto, UpdateFieldDto } from './dto';

@Injectable()
export class FieldRmq<T extends Partial<FieldDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createField',
      queue: 'createField',
    });
  }

  create(projectId: number, payload: CreateFieldDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createField',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneField',
      queue: 'findOneField',
    });
  }

  findOne(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneField',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllFields',
      queue: 'findAllFields',
    });
  }

  findAll(projectId: number): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'platform',
      routingKey: 'findAllFields',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'updateField',
      queue: 'updateField',
    });
  }

  update(projectId: number, id: number, payload: UpdateFieldDto): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'updateField',
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
      routingKey: 'removeField',
      queue: 'removeField',
    });
  }

  remove(projectId: number, id: number): Promise<T> {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeField',
      payload: {
        projectId,
        id,
      },
    });
  }
}
