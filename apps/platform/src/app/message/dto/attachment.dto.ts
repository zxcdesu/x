import { Exclude } from 'class-transformer';
import { Attachment, AttachmentType } from '../../prisma.service';

export class AttachmentDto implements Attachment {
  @Exclude()
  id: number;

  @Exclude()
  contentId: number;

  url: string;

  type: AttachmentType;

  name: string;
}