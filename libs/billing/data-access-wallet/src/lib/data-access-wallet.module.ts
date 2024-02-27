import { Module } from '@nestjs/common';
import { PrismaBillingModule } from '@zxcdesu/prisma-billing';
import { WalletService } from './wallet.service';

@Module({
  imports: [PrismaBillingModule],
  providers: [WalletService],
  exports: [WalletService],
})
export class DataAccessWalletModule {}
