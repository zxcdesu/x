import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { Prisma, AttachmentType } from '../../prisma.service';

export class CreateAttachmentDto
  implements Omit<Prisma.AttachmentCreateInput, 'content'>
{
  @IsUrl()
  url: string;

  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsOptional()
  @IsString()
  name: string | null;
}
