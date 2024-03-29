import { HistoryType, Prisma } from '@zxcdesu/prisma-history';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CreateHistoryDto implements Prisma.HistoryUncheckedCreateInput {
  @ValidateIf((object: CreateHistoryDto) => object.userId == null)
  @IsInt()
  projectId?: number;

  @ValidateIf((object: CreateHistoryDto) => object.projectId == null)
  @IsInt()
  userId?: number;

  @IsEnum(HistoryType)
  type: HistoryType;

  @IsOptional()
  @IsObject()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}
