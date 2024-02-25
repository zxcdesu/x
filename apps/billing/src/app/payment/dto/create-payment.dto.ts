import { IsEnum, IsNumber, Min } from 'class-validator';
import { PaymentProvider, Prisma } from '../../prisma.service';

export class CreatePaymentDto
  implements Omit<Prisma.PaymentUncheckedCreateInput, 'projectId'>
{
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsNumber()
  @Min(1)
  amount: number;
}
