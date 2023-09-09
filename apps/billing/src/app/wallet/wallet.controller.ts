import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @RabbitRPC({
    routingKey: 'createWallet',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  create(@RabbitPayload() payload: CreateWalletDto) {
    return this.walletService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneWallet',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  findOne(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.walletService.findOne(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateWallet',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  update(@RabbitPayload() payload: UpdateWalletDto) {
    return this.walletService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeWallet',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  remove(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.walletService.remove(projectId);
  }
}
