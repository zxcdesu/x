import { PaymentProvider, Prisma } from '@zxcdesu/prisma-billing';
import { IsEnum, IsNumber, Min } from 'class-validator';

export class CreatePaymentDto
  implements Omit<Prisma.PaymentUncheckedCreateInput, 'projectId'>
{
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsNumber()
  @Min(1)
  amount: number;
}
