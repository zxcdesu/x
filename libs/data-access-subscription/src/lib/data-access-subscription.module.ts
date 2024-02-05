import { Module } from '@nestjs/common';
import { PrismaBillingModule } from '@zxcdesu/prisma-billing';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [PrismaBillingModule],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class DataAccessSubscriptionModule {}
