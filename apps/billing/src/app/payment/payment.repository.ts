import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentProvider, PrismaService } from '../prisma.service';
import { AbstractPayment } from './abstract.payment';
import { YookassaPayment } from './yookassa.payment';

@Injectable()
export class PaymentRepository
  implements Record<PaymentProvider, typeof AbstractPayment<unknown>>
{
  [PaymentProvider.Yookassa] = YookassaPayment;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  get(provider: PaymentProvider): AbstractPayment {
    return new this[provider](
      this.configService,
      this.httpService,
      this.prismaService,
    );
  }
}
