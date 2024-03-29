import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import {
  CreateWalletDto,
  UpdateWalletDto,
  WalletDto,
  WalletService,
} from '@zxcdesu/data-access-wallet';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'createWallet',
    queue: 'createWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateWalletDto,
  ): Promise<WalletDto> {
    return this.walletService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'findOneWallet',
    queue: 'findOneWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  findOne(@ProjectId() projectId: number): Promise<WalletDto> {
    return this.walletService.findOne(projectId);
  }

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'updateWallet',
    queue: 'updateWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: UpdateWalletDto,
  ): Promise<WalletDto> {
    return this.walletService.update(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'removeWallet',
    queue: 'removeWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  remove(@ProjectId() projectId: number): Promise<WalletDto> {
    return this.walletService.remove(projectId);
  }
}
