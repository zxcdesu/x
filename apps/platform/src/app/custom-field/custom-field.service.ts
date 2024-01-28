import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';

@Injectable()
export class CustomFieldService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(projectId: number, payload: CreateCustomFieldDto) {
    const { contact } = await this.prismaService.customField.create({
      data: {
        contact: {
          connect: {
            projectId_id: {
              projectId,
              id: payload.contactId,
            },
          },
        },
        name: payload.name,
        value: payload.value,
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

  async remove(projectId: number, id: number) {
    const { contact } = await this.prismaService.customField.delete({
      where: {
        id,
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
