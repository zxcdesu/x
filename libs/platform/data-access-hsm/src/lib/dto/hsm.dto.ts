import {
  CreateAttachmentDto,
  CreateButtonDto,
} from '@zxcdesu/data-access-message';
import { Hsm } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';
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
