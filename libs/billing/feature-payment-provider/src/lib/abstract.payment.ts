import { HttpService } from '@nestjs/axios';
import {
  CreatePaymentDto,
  HandlePaymentDto,
  PaymentDto,
  PaymentService,
  PaymentUrlDto,
} from '@zxcdesu/data-access-payment';
import { WalletService } from '@zxcdesu/data-access-wallet';
import { PaymentStatus, PrismaService } from '@zxcdesu/prisma-billing';
import { PaymentProviderOptions } from './payment-provider-options.interface';

export abstract class AbstractPayment<T = unknown> {
  constructor(
    protected readonly options: PaymentProviderOptions,
    protected readonly httpService: HttpService,
    protected readonly paymentService: PaymentService,
    protected readonly walletService: WalletService,
    private readonly prismaService: PrismaService,
  ) {}

  abstract create(
    payment: PaymentDto,
    payload: CreatePaymentDto,
  ): Promise<PaymentUrlDto>;

  abstract handleWebhook(payload: HandlePaymentDto<T>): Promise<void>;

  protected async update(
    payment: PaymentDto,
    status: PaymentStatus,
    incomeAmount?: number,
  ) {
    await this.prismaService.$transaction(async (transaction) => {
      await transaction.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status,
          incomeAmount,
        },
      });

      if (status === PaymentStatus.Succeeded) {
        await transaction.wallet.update({
          where: {
            projectId: payment.projectId,
          },
          data: {
            currentBalance: {
              increment: incomeAmount,
            },
          },
        });
      }
    });
  }
}
