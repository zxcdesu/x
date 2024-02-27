import { Prisma } from '@zxcdesu/prisma-billing';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto implements Prisma.PaymentUncheckedUpdateInput {
  @IsOptional()
  @IsString()
  externalId?: string;

  @IsOptional()
  @IsDate()
  expiresAt?: Date;
}
