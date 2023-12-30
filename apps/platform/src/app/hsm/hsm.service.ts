import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '../prisma.service';
import { CreateHsmDto } from './dto/create-hsm.dto';
import { UpdateHsmDto } from './dto/update-hsm.dto';

@Injectable()
export class HsmService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateHsmDto) {
    return this.prismaService.hsm.create({
      data: payload as unknown as Prisma.HsmCreateInput,
      include: {
        approval: {
          include: {
            channel: true,
          },
        },
      },
    });
  }

  async findOne(projectId: number, id: number) {
    return this.prismaService.hsm.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      include: {
        approval: {
          include: {
            channel: true,
          },
        },
      },
    });
  }

  async findAll(projectId: number) {
    return this.prismaService.hsm.findMany({
      where: {
        projectId,
      },
      include: {
        approval: {
          include: {
            channel: true,
          },
        },
      },
    });
  }

  async update(payload: UpdateHsmDto) {
    return this.prismaService.hsm.update({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.id,
        },
      },
      data: payload as unknown as Prisma.HsmUpdateInput,
      include: {
        approval: {
          include: {
            channel: true,
          },
        },
      },
    });
  }

  async remove(projectId: number, id: number) {
    return this.prismaService.hsm.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      include: {
        approval: {
          include: {
            channel: true,
          },
        },
      },
    });
  }
}
