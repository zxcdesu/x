import { IsInt, IsOptional, IsString } from 'class-validator';
import { Prisma } from '../../prisma.service';

export class CreateContactFieldDto
  implements Prisma.ContactFieldUncheckedCreateInput
{
  @IsInt()
  contactId: number;

  @IsInt()
  fieldId: number;

  @IsOptional()
  @IsString()
  value?: string;
}
