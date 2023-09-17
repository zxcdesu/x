import { Exclude, Type } from 'class-transformer';
import { Contact, ContactStatus } from '../../prisma.service';
import { TagDto } from '../../tag/dto/tag.dto';
import { AssignedTo } from './assigned-to.dto';
import { CustomField } from './custom-field.dto';

export class ContactDto implements Contact {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  imageUrl: string | null;

  priority: number;

  status: ContactStatus;

  rejectedReason: string | null;

  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;

  @Type(() => AssignedTo)
  assignedTo: AssignedTo | null;

  @Type(() => CustomField)
  customFields: CustomField[];

  @Type(() => TagDto)
  tags: TagDto[];
}
