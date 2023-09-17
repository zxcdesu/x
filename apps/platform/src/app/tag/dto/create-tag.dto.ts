import { IsHexColor, IsInt, IsString } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateTagDto implements Prisma.TagUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsHexColor()
  color: string;

  @IsInt()
  parentId?: number;
}
