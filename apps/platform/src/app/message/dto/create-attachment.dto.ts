import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { AttachmentType, Prisma } from '../../prisma.service';

export class CreateAttachmentDto
  implements Omit<Prisma.AttachmentUncheckedCreateInput, 'contentId'>
{
  @IsUrl()
  url: string;

  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsOptional()
  @IsString()
  name: string | null;
}
