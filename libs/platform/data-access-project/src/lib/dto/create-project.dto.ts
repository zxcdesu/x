import { Prisma } from '@zxcdesu/prisma-platform';
import { Trim } from '@zxcdesu/util-transformer';
import { IsString, IsUrl, Length } from 'class-validator';

export class CreateProjectDto implements Prisma.ProjectUncheckedCreateInput {
  @Trim()
  @IsString()
  @Length(1, 120)
  name: string;

  @IsUrl()
  imageUrl?: string;
}
