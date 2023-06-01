import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  create() {
    return this.walletService.create();
  }

  findOne() {
    return this.walletService.findOne();
  }

  findAll() {
    return this.walletService.findAll();
  }

  update() {
    return this.walletService.update();
  }

  remove() {
    return this.walletService.remove();
  }
}
