import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateFieldDto
  implements Omit<Prisma.FieldCreateWithoutContactsInput, 'projectId'>
{
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 20)
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 1000)
  description?: string;

  @IsOptional()
  @IsString()
  value?: string;
}
