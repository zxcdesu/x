import { Module } from '@nestjs/common';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [WalletService],
})
export class AppModule {}
