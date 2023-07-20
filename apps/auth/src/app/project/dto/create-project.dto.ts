import { IsOptional, IsString, IsUrl } from 'class-validator';
import { Prisma } from '../../../../prisma/generated';

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
