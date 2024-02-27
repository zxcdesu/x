import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentService } from '@zxcdesu/data-access-payment';
import { WalletService } from '@zxcdesu/data-access-wallet';
import { PaymentProvider, PrismaService } from '@zxcdesu/prisma-billing';
import { AbstractPayment } from './abstract.payment';
import { MODULE_OPTIONS_TOKEN } from './feature-payment-provider.module-definition';
import { PaymentProviderOptions } from './payment-provider-options.interface';
import { YookassaPayment } from './yookassa.payment';

@Injectable()
export class PaymentRepository
  implements Record<PaymentProvider, typeof AbstractPayment<unknown>>
{
  [PaymentProvider.Yookassa] = YookassaPayment;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: PaymentProviderOptions,
    private readonly httpService: HttpService,
    private readonly walletService: WalletService,
    private readonly paymentService: PaymentService,
    private readonly prismaService: PrismaService,
  ) {}

  get(provider: PaymentProvider): AbstractPayment {
    return new this[provider](
      this.options,
      this.httpService,
      this.paymentService,
      this.walletService,
      this.prismaService,
    );
  }
}
