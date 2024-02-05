import { Prisma } from '@zxcdesu/prisma-billing';
import {
  IsISO31661Alpha2,
  IsISO4217CurrencyCode,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateWalletDto
  implements Omit<Prisma.WalletUncheckedCreateInput, 'projectId'>
{
  @IsISO31661Alpha2()
  country: string;

  @IsOptional()
  @IsISO4217CurrencyCode()
  currency?: string;

  @IsOptional()
  @IsNumber()
  currentBalance?: number;
}
