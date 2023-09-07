import { Exclude, Expose, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Content } from '../../prisma.service';
import { AttachmentDto } from './attachment.dto';
import { ButtonDto } from './button.dto';

export class ContentDto implements Content {
  @Expose()
  id: number;

  @Exclude()
  messageId: number;

  @IsOptional()
  @IsString()
  text: string;

  @Type(() => AttachmentDto)
  @IsOptional()
  @ValidateNested({ each: true })
  attachments: AttachmentDto[];

  @Type(() => ButtonDto)
  @IsOptional()
  @ValidateNested({ each: true })
  buttons: ButtonDto[];
}
