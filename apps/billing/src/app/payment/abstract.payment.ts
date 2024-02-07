import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Payment, PrismaService } from '../prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandleWebhookDto } from './dto/handle-webhook.dto';
import { PaymentDto } from './dto/payment.dto';

export abstract class AbstractPayment<T = unknown> {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
  ) {}

  abstract create(
    payment: Payment,
    payload: CreatePaymentDto,
  ): Promise<PaymentDto>;

  abstract handleWebhook(payload: HandleWebhookDto<T>): Promise<void>;
}
