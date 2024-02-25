import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateProjectDto implements Prisma.ProjectUncheckedCreateInput {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 120)
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
