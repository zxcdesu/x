import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '../prisma.service';
import { CreateHsmDto } from './dto/create-hsm.dto';
import { UpdateHsmDto } from './dto/update-hsm.dto';

@Injectable()
export class HsmService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateHsmDto) {
    return this.prismaService.hsm.create({
      data: {
        projectId,
        ...payload,
      } as unknown as Prisma.HsmCreateInput,
      include: {
        approval: {
          include: {
            channel: true,
          },
        },
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.hsm.findUniqueOrThrow({
      where: {
        projectId,
        id,
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

  findAll(projectId: number) {
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

  update(projectId: number, id: number, payload: UpdateHsmDto) {
    return this.prismaService.hsm.update({
      where: {
        projectId,
        id,
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

  remove(projectId: number, id: number) {
    return this.prismaService.hsm.delete({
      where: {
        projectId,
        id,
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
