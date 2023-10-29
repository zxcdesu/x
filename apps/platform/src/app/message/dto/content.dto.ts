import { OmitType } from '@nestjs/mapped-types';
import { Exclude, Type } from 'class-transformer';
import { Content } from '../../prisma.service';
import { AttachmentDto } from './attachment.dto';
import { ButtonDto } from './button.dto';
import { CreateContentDto } from './create-content.dto';

export class ContentDto
  extends OmitType(CreateContentDto, ['attachments', 'buttons'] as const)
  implements Omit<Content, 'buttons'>
{
  @Exclude()
  id: number;

  @Exclude()
  messageId: number;

  @Type(() => AttachmentDto)
  attachments: AttachmentDto[];

  @Type(() => ButtonDto)
  buttons: ButtonDto[];
}
