import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
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

  findAll(projectId: number) {
    return this.prismaService.contact.findMany({
      where: {
        projectId,
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
}
