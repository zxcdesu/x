import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Prisma } from '../../prisma.service';
import { CreateAttachmentDto } from './create-attachment.dto';
import { CreateButtonDto } from './create-button.dto';

export class CreateContentDto
  implements
    Omit<Prisma.ContentCreateInput, 'message' | 'attachments' | 'buttons'>
{
  @IsOptional()
  @IsString()
  text: string;

  @Type(() => CreateAttachmentDto)
  @IsOptional()
  @ValidateNested({ each: true })
  attachments: CreateAttachmentDto[];

  @Type(() => CreateButtonDto)
  @IsOptional()
  @ValidateNested({ each: true })
  buttons: CreateButtonDto[];
}
