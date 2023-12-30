import { Exclude, Type } from 'class-transformer';
import { Prisma, Wallet } from '../../prisma.service';

export class WalletDto implements Wallet {
  @Exclude()
  projectId: number;

  country: string;

  currency: string;

  @Type(() => Number)
  currentBalance: Prisma.Decimal;
}
