import { Injectable } from '@nestjs/common';
import { ContactStatus, PrismaService } from '../prisma.service';
import { AssignContactDto } from './dto/assign-contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { FindAllContactsDto } from './dto/find-all-contacts.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateContactDto) {
    return this.prismaService.contact.create({
      data: payload,
      include: {
        assignedTo: true,
        customFields: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.contact.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      include: {
        assignedTo: true,
        customFields: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  findAll(payload: FindAllContactsDto) {
    return this.prismaService.contact.findMany({
      where: {
        projectId: payload.projectId,
        OR: [
          {
            assignedTo: null,
          },
          {
            assignedTo: payload.assignedTo,
          },
        ],
      },
      include: {
        assignedTo: true,
        customFields: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  update(payload: UpdateContactDto) {
    return this.prismaService.contact.update({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.id,
        },
      },
      data: payload,
      include: {
        assignedTo: true,
        customFields: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.prismaService.contact.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      include: {
        assignedTo: true,
        customFields: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  assign(payload: AssignContactDto) {
    return this.prismaService.contact.update({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.id,
        },
      },
      data: {
        assignedTo: {
          create: payload.assignedTo,
        },
        status: ContactStatus.Processing,
      },
      include: {
        assignedTo: true,
        customFields: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  resolve(projectId: number, id: number) {
    return this.prismaService.contact.update({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      data: {
        assignedTo: null,
        status: ContactStatus.Resolved,
      },
      include: {
        assignedTo: true,
        customFields: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  reject(projectId: number, id: number) {
    return this.prismaService.contact.update({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      data: {
        assignedTo: null,
        status: ContactStatus.Rejected,
      },
      include: {
        assignedTo: true,
        customFields: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }
}
