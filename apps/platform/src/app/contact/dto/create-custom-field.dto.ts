import { IsOptional, IsString } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateCustomFieldDto
  implements Prisma.CustomFieldCreateWithoutContactInput
{
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  value: string | null;
}
