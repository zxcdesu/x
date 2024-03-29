import { Prisma } from '@zxcdesu/prisma-platform';
import { IsInt, IsOptional, IsString } from 'class-validator';

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
