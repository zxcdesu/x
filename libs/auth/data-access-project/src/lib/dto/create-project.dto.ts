import { Prisma } from '@zxcdesu/prisma-auth';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateProjectDto implements Prisma.ProjectUncheckedCreateInput {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 120)
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
