import { IsInt, IsOptional, IsString } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateCustomFieldDto
  implements Prisma.CustomFieldUncheckedCreateInput
{
  @IsInt()
  contactId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  value?: string;
}
