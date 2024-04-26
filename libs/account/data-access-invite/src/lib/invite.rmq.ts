import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateInviteDto, InviteDto } from './dto';

@Injectable()
export class InviteRmq<
  T extends Partial<StringifyDate<InviteDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'createInvite',
      queue: 'createInvite',
    });
  }

  create(projectId: number, payload: CreateInviteDto) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'createInvite',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findAllInvites',
      queue: 'findAllInvites',
    });
  }

  findAll(projectId: number) {
    return this.request<T[]>({
      exchange: 'account',
      routingKey: 'findAllInvites',
      payload: {
        projectId,
      },
    });
  }
}
