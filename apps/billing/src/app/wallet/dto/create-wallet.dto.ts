import {
  IsISO31661Alpha2,
  IsISO4217CurrencyCode,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateWalletDto implements Prisma.WalletUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsISO31661Alpha2()
  country: string;

  @IsOptional()
  @IsISO4217CurrencyCode()
  currency?: string;

  @IsOptional()
  @IsNumber()
  currentBalance?: number;
}
