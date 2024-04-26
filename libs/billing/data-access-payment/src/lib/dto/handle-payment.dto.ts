import { PaymentProvider } from '@zxcdesu/prisma-billing';
import { IsDefined, IsEnum } from 'class-validator';

export class HandlePaymentDto<T = unknown> {
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsDefined()
  value: T;
}
