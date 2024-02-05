import { Prisma, Wallet } from '@zxcdesu/prisma-billing';
import { Exclude, Type } from 'class-transformer';

export class WalletDto implements Wallet {
  @Exclude()
  projectId: number;

  country: string;

  currency: string;

  @Type(() => Number)
  currentBalance: Prisma.Decimal;
}
