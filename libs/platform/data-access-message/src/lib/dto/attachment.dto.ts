import { Attachment, AttachmentType } from '@zxcdesu/prisma-platform';
import { Exclude } from 'class-transformer';

export class AttachmentDto implements Attachment {
  @Exclude()
  id: number;

  @Exclude()
  contentId: number;

  name: string | null;

  url: string;

  type: AttachmentType;
}
