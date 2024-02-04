import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'createWallet',
    queue: 'createWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  create(@RabbitPayload() payload: CreateWalletDto) {
    return this.walletService.create(payload);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'findOneWallet',
    queue: 'findOneWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  findOne(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.walletService.findOne(projectId);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'findAllWallets',
    queue: 'findAllWallets',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  findAll() {
    return this.walletService.findAll();
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'updateWallet',
    queue: 'updateWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  update(@RabbitPayload() payload: UpdateWalletDto) {
    return this.walletService.update(payload);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'removeWallet',
    queue: 'removeWallet',
  })
  @SerializeOptions({
    type: WalletDto,
  })
  remove(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.walletService.remove(projectId);
  }
}
