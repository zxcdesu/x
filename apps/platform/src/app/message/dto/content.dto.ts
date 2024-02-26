import { Exclude, Type } from 'class-transformer';
import { Content } from '../../prisma.service';
import { AttachmentDto } from './attachment.dto';
import { ButtonDto } from './button.dto';

export class ContentDto implements Omit<Content, 'buttons'> {
  @Exclude()
  id: number;

  @Exclude()
  messageId: number;

  text: string | null;

  @Type(() => AttachmentDto)
  attachments: AttachmentDto[];

  @Type(() => ButtonDto)
  buttons: ButtonDto[];
}
