import { HttpService } from '@nestjs/axios';
import {
  CreatePaymentDto,
  HandlePaymentDto,
  PaymentDto,
  PaymentInPendingDto,
  PaymentService,
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
  ): Promise<PaymentInPendingDto>;

  abstract handleWebhook(payload: HandlePaymentDto<T>): Promise<void>;

  protected prepare(
    payment: PaymentDto,
    expiresAt?: Date,
    externalId?: string,
  ) {
    return this.prismaService.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        expiresAt,
        externalId,
      },
    });
  }

  protected complete(
    payment: PaymentDto,
    status: PaymentStatus,
    incomeAmount?: number,
  ) {
    return this.prismaService.$transaction(async (transaction) => {
      payment = await transaction.payment.update({
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

      return payment;
    });
  }
}
