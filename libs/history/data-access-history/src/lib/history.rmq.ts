import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateHistoryDto, HistoryDto } from './dto';

@Injectable()
export class HistoryRmq<
  T extends Partial<StringifyDate<HistoryDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'history',
      routingKey: 'createHistory',
      queue: 'createHistory',
    });
  }

  create(payload: CreateHistoryDto) {
    return this.request<T>({
      exchange: 'history',
      routingKey: 'createHistory',
      payload,
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'history',
      routingKey: 'findAllHistories',
      queue: 'findAllHistories',
    });
  }

  findAll(projectId?: number, userId?: number) {
    return this.request<T>({
      exchange: 'history',
      routingKey: 'findAllHistory',
      payload: {
        projectId,
        userId,
      },
    });
  }
}
