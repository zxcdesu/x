import { AttachmentType, Prisma } from '@zxcdesu/prisma-platform';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateAttachmentDto
  implements Omit<Prisma.AttachmentUncheckedCreateInput, 'contentId'>
{
  @IsUrl()
  url: string;

  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  name?: string;
}
