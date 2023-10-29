import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletDto } from './dto/project.dto';
import { UpdateWalletDto } from './dto/update-project.dto';

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

  findOne(projectId: number, id: number) {
    return this.request<WalletDto>({
      exchange: 'billing',
      routingKey: 'findOneWallet',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<WalletDto[]>({
      exchange: 'billing',
      routingKey: 'findAllWallets',
      payload: {
        projectId,
        ids,
      },
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

  remove(projectId: number, id: number) {
    return this.request<WalletDto>({
      exchange: 'billing',
      routingKey: 'removeWallet',
      payload: {
        projectId,
        id,
      },
    });
  }
}
