import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription/subscription.controller';
import { SubscriptionService } from './subscription/subscription.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';

@Module({
  imports: [],
  controllers: [SubscriptionController, WalletController],
  providers: [SubscriptionService, WalletService],
})
export class AppModule {}
