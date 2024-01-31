import {
  IsEnum,
  IsISO4217CurrencyCode,
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';
import { PaymentProvider } from '../../prisma.service';

export class CreatePaymentDto {
  @IsInt()
  projectId: number;

  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsISO4217CurrencyCode()
  currency: string;

  @IsNumber()
  @Min(1)
  value: number;
}
