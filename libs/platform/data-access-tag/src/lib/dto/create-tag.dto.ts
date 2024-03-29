import { Prisma } from '@zxcdesu/prisma-platform';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 20)
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  description?: string;

  @IsHexColor()
  color: string;

  @IsOptional()
  @IsInt()
  parentId?: number | null;
}
