import { IsDefined, IsEnum } from 'class-validator';
import { PaymentProvider } from '../../prisma.service';

export class HandlePaymentDto<T = unknown> {
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsDefined()
  value: T;
}
