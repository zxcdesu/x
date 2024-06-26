import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { CreateContactDto, UpdateContactDto } from './dto';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateContactDto) {
    return this.prismaService.contact.create({
      data: {
        projectId,
        ...payload,
        assignedTo: payload.assignedTo && {
          create: payload.assignedTo,
        },
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

  findOne(projectId: number, id: number) {
    return this.prismaService.contact.findUniqueOrThrow({
      where: {
        projectId,
        id,
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

  findAll(projectId: number) {
    return this.prismaService.contact.findMany({
      where: {
        projectId,
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

  update(projectId: number, id: number, payload: UpdateContactDto) {
    return this.prismaService.contact.update({
      where: {
        projectId,
        id,
      },
      data: {
        ...payload,
        assignedTo: payload.assignedTo && {
          create: payload.assignedTo,
        },
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

  remove(projectId: number, id: number) {
    return this.prismaService.contact.delete({
      where: {
        projectId,
        id,
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
