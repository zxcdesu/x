import { HttpService } from '@nestjs/axios';
import { Payment, PrismaService } from '@zxcdesu/prisma-billing';
import { DataAccessPaymentModuleOptions } from './data-access-payment-module-options.interface';
import { CreatePaymentDto, HandleWebhookDto, PaymentDto } from './dto';

export abstract class AbstractPayment<T = unknown> {
  constructor(
    protected readonly options: DataAccessPaymentModuleOptions,
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
  ) {}

  abstract create(
    payment: Payment,
    payload: CreatePaymentDto,
  ): Promise<PaymentDto>;

  abstract handleWebhook(payload: HandleWebhookDto<T>): Promise<void>;
}
