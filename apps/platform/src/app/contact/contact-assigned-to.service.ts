import { Injectable } from '@nestjs/common';
import { ContactStatus, PrismaService } from '../prisma.service';
import { CloseContactDto } from './dto/close-contact.dto';
import { EnqueueContactDto } from './dto/enqueue-contact.dto';

@Injectable()
export class ContactAssignedToService {
  constructor(private readonly prismaService: PrismaService) {}

  enqueue(projectId: number, id: number, payload: EnqueueContactDto) {
    return this.prismaService.contact.update({
      where: {
        projectId,
        id,
      },
      data: {
        assignedTo: {
          create: payload.assignedTo,
        },
        status: ContactStatus.Queued,
      },
      include: {
        assignedTo: true,
        fields: {
          include: {
            field: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  close(projectId: number, id: number, payload: CloseContactDto) {
    return this.prismaService.contact.update({
      where: {
        projectId,
        id,
      },
      data: {
        status: ContactStatus.Closed,
        ...payload,
      },
      include: {
        assignedTo: true,
        fields: {
          include: {
            field: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }
}
