import { Prisma } from '@zxcdesu/prisma-platform';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { CreateAttachmentDto } from './create-attachment.dto';
import { CreateButtonDto } from './create-button.dto';

export class CreateContentDto
  implements
    Omit<
      Prisma.ContentUncheckedCreateInput,
      'messageId' | 'attachments' | 'buttons'
    >
{
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  text?: string;

  @Type(() => CreateAttachmentDto)
  @IsOptional()
  @ValidateNested({ each: true })
  attachments: CreateAttachmentDto[];

  @Type(() => CreateButtonDto)
  @IsOptional()
  @ValidateNested({ each: true })
  buttons: CreateButtonDto[];
}
