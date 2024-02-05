import { Prisma } from '@zxcdesu/prisma-auth';
import { IsOptional, IsString, IsUrl } from 'class-validator';

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
