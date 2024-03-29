import { ContactFieldDto } from '@zxcdesu/data-access-contact-field';
import { ContactTagDto } from '@zxcdesu/data-access-contact-tag';
import { Contact, ContactStatus } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';
import { AssignedToDto } from './assigned-to.dto';

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
