import { IsHexColor, IsInt, IsOptional, IsString } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateTagDto implements Prisma.TagCreateInput {
  @IsInt()
  projectId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsHexColor()
  color: string;

  @IsOptional()
  @IsInt()
  parentId?: number | null;
}
