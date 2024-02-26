import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateContactDto) {
    return this.prismaService.contact.create({
      data: {
        projectId,
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
      data: payload,
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
