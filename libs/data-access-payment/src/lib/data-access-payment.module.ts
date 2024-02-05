import { Module } from '@nestjs/common';
import { PrismaBillingModule } from '@zxcdesu/prisma-billing';
import { ConfigurableModuleClass } from './data-access-payment.module-definition';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';
import { YookassaPayment } from './yookassa.payment';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaBillingModule, HttpModule.register({})],
  providers: [PaymentRepository, PaymentService, YookassaPayment],
  exports: [PaymentService],
})
export class DataAccessPaymentModule extends ConfigurableModuleClass {}
