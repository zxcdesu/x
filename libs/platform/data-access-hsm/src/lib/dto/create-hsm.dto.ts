import {
  CreateAttachmentDto,
  CreateButtonDto,
} from '@zxcdesu/data-access-message';
import { Prisma } from '@zxcdesu/prisma-platform';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, ValidateNested } from 'class-validator';

export class CreateHsmDto
  implements
    Omit<
      Prisma.HsmUncheckedCreateInput,
      'projectId' | 'attachments' | 'buttons'
    >
{
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 20)
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 1000)
  text: string;

  @Type(() => CreateAttachmentDto)
  @IsOptional()
  @ValidateNested({ each: true })
  attachments?: CreateAttachmentDto[];

  @Type(() => CreateButtonDto)
  @IsOptional()
  @ValidateNested({ each: true })
  buttons?: CreateButtonDto[];
}
