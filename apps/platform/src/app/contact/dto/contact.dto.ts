import { Exclude, Type } from 'class-transformer';
import { Contact, ContactStatus } from '../../prisma.service';
import { AssignedToDto } from './assigned-to.dto';
import { ContactTagDto } from './contact-tag.dto';
import { CustomFieldDto } from './custom-field.dto';

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

  @Type(() => AssignedToDto)
  assignedTo: AssignedToDto | null;

  @Type(() => CustomFieldDto)
  customFields: CustomFieldDto[];

  @Type(() => ContactTagDto)
  tags: ContactTagDto[];
}
