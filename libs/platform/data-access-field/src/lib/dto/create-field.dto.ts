import { Prisma } from '@zxcdesu/prisma-platform';
import { Trim } from '@zxcdesu/util-transformer';
import { IsString, Length } from 'class-validator';

export class CreateFieldDto
  implements Omit<Prisma.FieldUncheckedCreateInput, 'projectId'>
{
  @Trim()
  @IsString()
  @Length(1, 120)
  name: string;

  @Trim()
  @IsString()
  @Length(1, 1000)
  description?: string;

  @Trim()
  @IsString()
  @Length(1, 1000)
  value?: string;
}
