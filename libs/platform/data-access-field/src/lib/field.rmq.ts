import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateFieldDto, FieldDto, UpdateFieldDto } from './dto';

@Injectable()
export class FieldRmq<
  T extends Partial<StringifyDate<FieldDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createField',
      queue: 'createField',
    });
  }

  create(projectId: number, payload: CreateFieldDto) {
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

  findOne(projectId: number, id: number) {
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

  findAll(projectId: number) {
    return this.request<T>({
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
      routingKey: 'findOneField',
      queue: 'findOneField',
    });
  }

  update(projectId: number, id: number, payload: UpdateFieldDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneField',
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

  remove(projectId: number, id: number) {
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
