import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ContactStatus, Prisma } from '../../prisma.service';

export class CreateContactDto
  implements Omit<Prisma.ContactUncheckedCreateInput, 'projectId'>
{
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @Length(1, 120)
  name?: string;

  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @IsIn([1, 2, 3, 4, 5])
  priority?: number;

  @IsOptional()
  @IsEnum(ContactStatus)
  status?: ContactStatus;

  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  closedReason?: string;
}
