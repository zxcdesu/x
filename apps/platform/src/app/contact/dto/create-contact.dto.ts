import { IsEnum, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';
import { ContactStatus, Prisma } from '../../prisma.service';

export class CreateContactDto implements Prisma.ContactUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  priority?: number;

  @IsOptional()
  @IsEnum(ContactStatus)
  status: ContactStatus;

  @IsOptional()
  @IsString()
  rejectedReason?: string;
}
