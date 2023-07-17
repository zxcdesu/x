import { Module } from '@nestjs/common';
import { PrismaService } from 'apps/billing/prisma/prisma.service';
import { SubscriptionController } from './subscription/subscription.controller';
import { SubscriptionService } from './subscription/subscription.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';

@Module({
  imports: [],
  controllers: [SubscriptionController, WalletController],
  providers: [PrismaService, SubscriptionService, WalletService],
})
export class AppModule {}
