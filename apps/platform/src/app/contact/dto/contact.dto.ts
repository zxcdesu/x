import { Exclude, Type } from 'class-transformer';
import { Contact, ContactStatus } from '../../prisma.service';
import { AssignedToDto } from './assigned-to.dto';
import { ContactFieldDto } from './contact-field.dto';
import { ContactTagDto } from './contact-tag.dto';

export class ContactDto implements Contact {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  imageUrl: string | null;

  priority: number;

  status: ContactStatus;

  closedReason: string | null;

  @Type(() => AssignedToDto)
  assignedTo: AssignedToDto | null;

  @Type(() => ContactFieldDto)
  fields: ContactFieldDto[];

  @Type(() => ContactTagDto)
  tags: ContactTagDto[];

  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;
}
