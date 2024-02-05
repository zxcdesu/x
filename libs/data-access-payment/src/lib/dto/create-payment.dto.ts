import { PaymentProvider } from '@zxcdesu/prisma-billing';
import { IsEnum, IsNumber, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsNumber()
  @Min(1)
  value: number;
}
