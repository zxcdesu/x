import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { CreateContactTagDto, RemoveContactTagDto } from './dto';

@Injectable()
export class ContactTagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(projectId: number, payload: CreateContactTagDto) {
    const { contact } = await this.prismaService.contactTag.create({
      data: {
        contact: {
          connect: {
            projectId,
            id: payload.contactId,
          },
        },
        tag: {
          connect: {
            projectId,
            id: payload.tagId,
          },
        },
      },
      select: {
        contact: {
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
        },
      },
    });

    return contact;
  }

  async remove(projectId: number, payload: RemoveContactTagDto) {
    const { contact } = await this.prismaService.contactTag.delete({
      where: {
        tagId_contactId: payload,
        contact: {
          projectId,
        },
      },
      select: {
        contact: {
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
        },
      },
    });

    return contact;
  }
}
