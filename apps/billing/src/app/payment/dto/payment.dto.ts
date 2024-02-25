import { Exclude, Transform, Type } from 'class-transformer';
import {
  Payment,
  PaymentProvider,
  PaymentStatus,
  Prisma,
} from '../../prisma.service';

export class PaymentDto implements Payment {
  id: number;

  @Exclude()
  projectId: number;

  @Exclude()
  externalId: string | null;

  provider: PaymentProvider;

  status: PaymentStatus;

  @Type(() => String)
  @Transform(({ value }) => value && new Prisma.Decimal(value))
  amount: Prisma.Decimal;

  @Type(() => String)
  @Transform(({ value }) => value && new Prisma.Decimal(value))
  incomeAmount: Prisma.Decimal | null;

  expiresAt: Date | null;
}
