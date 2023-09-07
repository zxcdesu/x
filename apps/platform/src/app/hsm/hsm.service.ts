import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateHsmDto } from './dto/create-hsm.dto';
import { UpdateHsmDto } from './dto/update-hsm.dto';
import { HsmRmq } from './hsm.rmq';

@Injectable()
export class HsmService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hsmRmq: HsmRmq,
  ) {}

  async create(payload: CreateHsmDto) {
    return this.prismaService.hsm.create({
      data: payload,
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
    });
  }

  async findAll(projectId: number) {
    return this.prismaService.channel.findMany({
      where: {
        projectId,
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
      data: payload,
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
    });
  }
}
