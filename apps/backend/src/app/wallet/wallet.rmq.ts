import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateWalletArgs } from './dto/create-wallet.args';
import { UpdateWalletArgs } from './dto/update-project.args';
import { WalletObject } from './dto/wallet.object';

@Injectable()
export class WalletRmq extends RmqService {
  create(projectId: number, payload: CreateWalletArgs) {
    return this.request<WalletObject>({
      exchange: 'billing',
      routingKey: 'createWallet',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number) {
    return this.request<WalletObject>({
      exchange: 'billing',
      routingKey: 'findOneWallet',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateWalletArgs) {
    return this.request<WalletObject>({
      exchange: 'billing',
      routingKey: 'updateWallet',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number) {
    return this.request<WalletObject>({
      exchange: 'billing',
      routingKey: 'removeWallet',
      payload: {
        projectId,
      },
    });
  }
}
