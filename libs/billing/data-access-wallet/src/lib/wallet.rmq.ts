import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreateWalletDto, UpdateWalletDto, WalletDto } from './dto';

@Injectable()
export class WalletRmq<
  T extends Partial<StringifyDate<WalletDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'createWallet',
      queue: 'createWallet',
    });
  }

  create(projectId: number, payload: CreateWalletDto) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'createWallet',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'findOneWallet',
      queue: 'findOneWallet',
    });
  }

  findOne(projectId: number) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'findOneWallet',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'updateWallet',
      queue: 'updateWallet',
    });
  }

  update(projectId: number, payload: UpdateWalletDto) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'updateWallet',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'removeWallet',
      queue: 'removeWallet',
    });
  }

  remove(projectId: number) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'removeWallet',
      payload: {
        projectId,
      },
    });
  }
}
