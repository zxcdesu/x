import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import {
  CreateIntegrationDto,
  IntegrationDto,
  UpdateIntegrationDto,
} from './dto';

@Injectable()
export class IntegrationRmq<
  T extends Partial<StringifyDate<IntegrationDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'createIntegration',
      queue: 'createIntegration',
    });
  }

  create(projectId: number, payload: CreateIntegrationDto) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'createIntegration',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'findOneIntegration',
      queue: 'findOneIntegration',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'findOneIntegration',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'findAllIntegrations',
      queue: 'findAllIntegrations',
    });
  }

  findAll(projectId: number) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'findAllIntegrations',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'findOneIntegration',
      queue: 'findOneIntegration',
    });
  }

  update(projectId: number, id: number, payload: UpdateIntegrationDto) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'findOneIntegration',
      payload: {
        projectId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'integrations',
      routingKey: 'removeIntegration',
      queue: 'removeIntegration',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'integrations',
      routingKey: 'removeIntegration',
      payload: {
        projectId,
        id,
      },
    });
  }
}
