import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DataAccessPaymentModule } from '@zxcdesu/data-access-payment';
import { DataAccessWalletModule } from '@zxcdesu/data-access-wallet';
import { PrismaBillingModule } from '@zxcdesu/prisma-billing';
import { ConfigurableModuleClass } from './feature-payment-provider.module-definition';
import { PaymentProviderService } from './payment-provider.service';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; PaymentRepository/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
    PrismaBillingModule,
    DataAccessPaymentModule,
    DataAccessWalletModule,
  ],
  providers: [PaymentRepository, PaymentProviderService],
  exports: [PaymentProviderService],
})
export class FeaturePaymentProviderModule extends ConfigurableModuleClass {}
