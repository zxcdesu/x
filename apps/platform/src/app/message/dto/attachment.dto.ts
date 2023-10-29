import { Exclude } from 'class-transformer';
import { Attachment } from '../../prisma.service';
import { CreateAttachmentDto } from './create-attachment.dto';

export class AttachmentDto extends CreateAttachmentDto implements Attachment {
  @Exclude()
  id: number;

  @Exclude()
  contentId: number;
}
