import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { AccountDto, CreateAccountDto, UpdateAccountDto } from './dto';

@Injectable()
export class AccountRmq<T extends Partial<AccountDto>> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'createAccount',
      queue: 'createAccount',
    });
  }

  create(payload: CreateAccountDto): Promise<T> {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'createAccount',
      payload,
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findOneAccount',
      queue: 'findOneAccount',
    });
  }

  findOne(id: string): Promise<T> {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'findOneAccount',
      payload: {
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findAllAccount',
      queue: 'findAllAccount',
    });
  }

  findAll(ids?: string[]): Promise<T[]> {
    return this.request<T[]>({
      exchange: 'account',
      routingKey: 'findAllAccount',
      payload: {
        ids,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'findOneAccount',
      queue: 'findOneAccount',
    });
  }

  update(id: string, payload: UpdateAccountDto): Promise<T> {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'findOneAccount',
      payload: {
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'account',
      routingKey: 'removeAccount',
      queue: 'removeAccount',
    });
  }

  remove(id: string): Promise<T> {
    return this.request<T>({
      exchange: 'account',
      routingKey: 'removeAccount',
      payload: {
        id,
      },
    });
  }
}
