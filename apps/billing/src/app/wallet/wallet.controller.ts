import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/data-access-project';
import {
  CreateWalletDto,
  UpdateWalletDto,
  WalletDto,
  WalletRmq,
  WalletService,
} from '@zxcdesu/data-access-wallet';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @WalletRmq.create()
  @SerializeOptions({
    type: WalletDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateWalletDto,
  ): Promise<WalletDto> {
    return this.walletService.create(projectId, payload);
  }

  @WalletRmq.findOne()
  @SerializeOptions({
    type: WalletDto,
  })
  findOne(@ProjectId() projectId: number): Promise<WalletDto> {
    return this.walletService.findOne(projectId);
  }

  @WalletRmq.update()
  @SerializeOptions({
    type: WalletDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: UpdateWalletDto,
  ): Promise<WalletDto> {
    return this.walletService.update(projectId, payload);
  }

  @WalletRmq.remove()
  @SerializeOptions({
    type: WalletDto,
  })
  remove(@ProjectId() projectId: number): Promise<WalletDto> {
    return this.walletService.remove(projectId);
  }
}
