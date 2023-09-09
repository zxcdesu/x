import {
  IsISO31661Alpha2,
  IsISO4217CurrencyCode,
  IsInt,
  IsNumber,
} from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateWalletDto implements Prisma.WalletUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsISO31661Alpha2()
  country: string;

  @IsISO4217CurrencyCode()
  currency?: string;

  @IsNumber()
  currentBalance?: number;
}
