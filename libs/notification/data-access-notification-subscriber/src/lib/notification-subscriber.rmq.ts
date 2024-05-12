import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import {
  CreateNotificationSubscriberDto,
  NotificationSubscriberDto,
  UpdateNotificationSubscriberDto,
} from './dto';

@Injectable()
export class NotificationSubscriberRmq<
  T extends Partial<StringifyDate<NotificationSubscriberDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'notification',
      routingKey: 'createNotificationSubscriber',
      queue: 'createNotificationSubscriber',
    });
  }

  create(projectId: number, payload: CreateNotificationSubscriberDto) {
    return this.request<T>({
      exchange: 'notification',
      routingKey: 'createNotificationSubscriber',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'notification',
      routingKey: 'findOneNotificationSubscriber',
      queue: 'findOneNotificationSubscriber',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'notification',
      routingKey: 'findOneNotificationSubscriber',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'notification',
      routingKey: 'findAllNotificationSubscribers',
      queue: 'findAllNotificationSubscribers',
    });
  }

  findAll(projectId: number) {
    return this.request<T>({
      exchange: 'notification',
      routingKey: 'findAllNotificationSubscribers',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'notification',
      routingKey: 'findOneNotificationSubscriber',
      queue: 'findOneNotificationSubscriber',
    });
  }

  update(
    projectId: number,
    id: number,
    payload: UpdateNotificationSubscriberDto,
  ) {
    return this.request<T>({
      exchange: 'notification',
      routingKey: 'findOneNotificationSubscriber',
      payload: {
        projectId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'notification',
      routingKey: 'removeNotificationSubscriber',
      queue: 'removeNotificationSubscriber',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'notification',
      routingKey: 'removeNotificationSubscriber',
      payload: {
        projectId,
        id,
      },
    });
  }
}
