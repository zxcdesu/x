import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAttachmentDto } from '../../message/dto/create-attachment.dto';
import { CreateButtonDto } from '../../message/dto/create-button.dto';
import { Prisma } from '../../prisma.service';

export class CreateHsmDto
  implements Omit<Prisma.HsmUncheckedCreateInput, 'attachments' | 'buttons'>
{
  @IsInt()
  projectId: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @Type(() => CreateAttachmentDto)
  @IsOptional()
  @IsObject({ each: true })
  attachments?: CreateAttachmentDto[];

  @Type(() => CreateButtonDto)
  @IsOptional()
  @IsObject({ each: true })
  buttons?: CreateButtonDto[];
}
