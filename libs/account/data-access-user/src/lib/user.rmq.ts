import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserRmq<
  T extends Partial<StringifyDate<UserDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'createUser',
      queue: 'createUser',
    });
  }

  create(payload: CreateUserDto) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'createUser',
      payload,
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findOneUser',
      queue: 'findOneUser',
    });
  }

  findOne(id: number) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'findOneUser',
      payload: {
        id,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'updateUser',
      queue: 'updateUser',
    });
  }

  update(id: number, payload: UpdateUserDto) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'updateUser',
      payload: {
        ...payload,
        id,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'removeUser',
      queue: 'removeUser',
    });
  }

  remove(id: number) {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'removeUser',
      payload: {
        id,
      },
    });
  }
}
