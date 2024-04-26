import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import {
  CreateSubscriptionDto,
  SubscriptionDto,
  UpdateSubscriptionDto,
} from './dto';

@Injectable()
export class SubscriptionRmq<
  T extends Partial<StringifyDate<SubscriptionDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'createSubscription',
      queue: 'createSubscription',
    });
  }

  create(projectId: number, payload: CreateSubscriptionDto) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'createSubscription',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'findOneSubscription',
      queue: 'findOneSubscription',
    });
  }

  findOne(projectId: number) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'findOneSubscription',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'updateSubscription',
      queue: 'updateSubscription',
    });
  }

  update(projectId: number, payload: UpdateSubscriptionDto) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'updateSubscription',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'removeSubscription',
      queue: 'removeSubscription',
    });
  }

  remove(projectId: number) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'removeSubscription',
      payload: {
        projectId,
      },
    });
  }
}
