import { IsOptional, IsString, IsUrl } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateProjectDto implements Prisma.ProjectUncheckedCreateInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
