import { Exclude, Transform } from 'class-transformer';
import { Decimal, Wallet } from '../../prisma.service';

export class WalletDto implements Wallet {
  @Exclude()
  projectId: number;

  country: string;

  currency: string;

  @Transform(({ value }) => Number(value), {
    toPlainOnly: true,
  })
  currentBalance: Decimal;
}
