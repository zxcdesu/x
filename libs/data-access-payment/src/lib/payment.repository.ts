import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentProvider, PrismaService } from '@zxcdesu/prisma-billing';
import { AbstractPayment } from './abstract.payment';
import { DataAccessPaymentModuleOptions } from './data-access-payment-module-options.interface';
import { MODULE_OPTIONS_TOKEN } from './data-access-payment.module-definition';
import { YookassaPayment } from './yookassa.payment';

@Injectable()
export class PaymentRepository
  implements Record<PaymentProvider, typeof AbstractPayment<unknown>>
{
  [PaymentProvider.Yookassa] = YookassaPayment;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    protected readonly options: DataAccessPaymentModuleOptions,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  get(provider: PaymentProvider): AbstractPayment {
    return new this[provider](
      this.options,
      this.httpService,
      this.prismaService,
    );
  }
}
