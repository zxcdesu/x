import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandlePaymentDto } from './dto/handle-payment.dto';
import { PaymentUrlDto } from './dto/payment-url.dto';
import { PaymentDto } from './dto/payment.dto';

export abstract class AbstractPayment<T = unknown> {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
  ) {}

  abstract create(
    payment: PaymentDto,
    payload: CreatePaymentDto,
  ): Promise<PaymentUrlDto>;

  abstract handleWebhook(payload: HandlePaymentDto<T>): Promise<void>;
}
