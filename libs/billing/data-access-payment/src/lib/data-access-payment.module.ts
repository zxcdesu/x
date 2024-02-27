import { Module } from '@nestjs/common';
import { PrismaBillingModule } from '@zxcdesu/prisma-billing';
import { PaymentService } from './payment.service';

@Module({
  imports: [PrismaBillingModule],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class DataAccessPaymentModule {}
