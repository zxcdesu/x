import { Content } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';
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
