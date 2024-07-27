import { Prisma } from '@zxcdesu/prisma-platform';
import { Trim } from '@zxcdesu/util-transformer';
import {
  IsHexColor,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTagDto
  implements Omit<Prisma.TagUncheckedCreateInput, 'projectId'>
{
  @Trim()
  @IsString()
  @Length(1, 120)
  name: string;

  @Trim()
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  description?: string;

  @Trim()
  @IsHexColor()
  color: string;

  @IsOptional()
  @IsInt()
  parentId?: number;
}
