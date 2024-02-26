import { Exclude, Type } from 'class-transformer';
import { CreateAttachmentDto } from '../../message/dto/create-attachment.dto';
import { CreateButtonDto } from '../../message/dto/create-button.dto';
import { Hsm } from '../../prisma.service';
import { ApprovalDto } from './approval.dto';

export class HsmDto implements Omit<Hsm, 'attachments' | 'buttons'> {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  text: string;

  @Type(() => CreateAttachmentDto)
  attachments: CreateAttachmentDto[];

  @Type(() => CreateButtonDto)
  buttons: CreateButtonDto[];

  @Type(() => ApprovalDto)
  approval: ApprovalDto[];

  createdAt: Date;

  updatedAt: Date;
}
