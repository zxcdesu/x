import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/nestjs-rabbitmq';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-project.dto';
import { WalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletRmq extends RmqService {
  create(projectId: number, payload: CreateWalletDto) {
    return this.request<WalletDto>({
      exchange: 'billing',
      routingKey: 'createWallet',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number) {
    return this.request<WalletDto>({
      exchange: 'billing',
      routingKey: 'findOneWallet',
      payload: {
        projectId,
      },
    });
  }

  findAll() {
    return this.request<WalletDto[]>({
      exchange: 'billing',
      routingKey: 'findAllWallets',
    });
  }

  update(projectId: number, payload: UpdateWalletDto) {
    return this.request<WalletDto>({
      exchange: 'billing',
      routingKey: 'updateWallet',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number) {
    return this.request<WalletDto>({
      exchange: 'billing',
      routingKey: 'removeWallet',
      payload: {
        projectId,
      },
    });
  }
}
