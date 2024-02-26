import { Exclude } from 'class-transformer';
import { Attachment, AttachmentType } from '../../prisma.service';

export class AttachmentDto implements Attachment {
  @Exclude()
  id: number;

  @Exclude()
  contentId: number;

  name: string | null;

  url: string;

  type: AttachmentType;
}
