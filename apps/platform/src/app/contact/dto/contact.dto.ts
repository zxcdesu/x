import { Exclude } from 'class-transformer';
import { Contact, ContactStatus } from '../../prisma.service';

export class ContactDto implements Contact {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  description: string;

  imageUrl: string;

  priority: number;

  status: ContactStatus;

  rejectedReason: string;

  closedReason: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
