import { IsEnum, IsInt, IsNumber, Min } from 'class-validator';
import { PaymentProvider } from '../../prisma.service';

export class CreatePaymentDto {
  @IsInt()
  projectId: number;

  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsNumber()
  @Min(1)
  value: number;
}
