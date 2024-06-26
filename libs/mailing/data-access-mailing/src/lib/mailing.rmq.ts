import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateMailingDto, MailingDto, UpdateMailingDto } from './dto';

@Injectable()
export class MailingRmq<
  T extends Partial<StringifyDate<MailingDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'mailing',
      routingKey: 'createMailing',
      queue: 'createMailing',
    });
  }

  create(projectId: number, payload: CreateMailingDto) {
    return this.request<T>({
      exchange: 'mailing',
      routingKey: 'createMailing',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'mailing',
      routingKey: 'findOneMailing',
      queue: 'findOneMailing',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'mailing',
      routingKey: 'findOneMailing',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'mailing',
      routingKey: 'findAllMailings',
      queue: 'findAllMailings',
    });
  }

  findAll(projectId: number) {
    return this.request<T>({
      exchange: 'mailing',
      routingKey: 'findAllMailings',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'mailing',
      routingKey: 'findOneMailing',
      queue: 'findOneMailing',
    });
  }

  update(projectId: number, id: number, payload: UpdateMailingDto) {
    return this.request<T>({
      exchange: 'mailing',
      routingKey: 'findOneMailing',
      payload: {
        projectId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'mailing',
      routingKey: 'removeMailing',
      queue: 'removeMailing',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'mailing',
      routingKey: 'removeMailing',
      payload: {
        projectId,
        id,
      },
    });
  }
}
