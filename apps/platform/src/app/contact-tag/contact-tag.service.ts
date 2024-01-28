import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { RemoveContactTagDto } from './dto/remove-contact-tag.dto';

@Injectable()
export class ContactTagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(projectId: number, payload: CreateContactTagDto) {
    const { contact } = await this.prismaService.contactTag.create({
      data: {
        contact: {
          connect: {
            projectId_id: {
              projectId,
              id: payload.contactId,
            },
          },
        },
        tag: {
          connect: {
            projectId_id: {
              projectId,
              id: payload.tagId,
            },
          },
        },
      },
      select: {
        contact: {
          include: {
            assignedTo: true,
            customFields: true,
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
            customFields: true,
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
