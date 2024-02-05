import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/data-access-project';
import {
  CreateWalletDto,
  UpdateWalletDto,
  WalletDto,
  WalletService,
} from '@zxcdesu/data-access-wallet';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'createWallet',
    queue: 'billing.createWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateWalletDto,
  ) {
    return this.walletService.create(projectId, payload);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'findOneWallet',
    queue: 'billing.findOneWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  findOne(@ProjectId() projectId: number) {
    return this.walletService.findOne(projectId);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'updateWallet',
    queue: 'billing.updateWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: UpdateWalletDto,
  ) {
    return this.walletService.update(projectId, payload);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'removeWallet',
    queue: 'billing.removeWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  remove(@ProjectId() projectId: number) {
    return this.walletService.remove(projectId);
  }
}
