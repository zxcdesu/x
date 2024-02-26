import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContactFieldDto } from './dto/create-contact-field.dto';
import { RemoveContactFieldDto } from './dto/remove-contact-field.dto';

@Injectable()
export class ContactFieldService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(projectId: number, payload: CreateContactFieldDto) {
    const { contact } = await this.prismaService.contactField.create({
      data: {
        contact: {
          connect: {
            projectId,
            id: payload.contactId,
          },
        },
        field: {
          connect: {
            projectId,
            id: payload.fieldId,
          },
        },
        value: payload.value,
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

  async remove(projectId: number, payload: RemoveContactFieldDto) {
    const { contact } = await this.prismaService.contactField.delete({
      where: {
        contactId_fieldId: payload,
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
