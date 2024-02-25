import { Exclude, Transform, Type } from 'class-transformer';
import { Prisma, Wallet } from '../../prisma.service';

export class WalletDto implements Wallet {
  @Exclude()
  projectId: number;

  country: string;

  currency: string;

  @Type(() => String)
  @Transform(({ value }) => value && new Prisma.Decimal(value))
  currentBalance: Prisma.Decimal;
}
