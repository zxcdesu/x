import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { CreateHsmDto, HsmDto, UpdateHsmDto } from './dto';

@Injectable()
export class HsmService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateHsmDto): Promise<HsmDto> {
    return this.prismaService.hsm.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number): Promise<HsmDto> {
    return this.prismaService.hsm.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number): Promise<HsmDto[]> {
    return this.prismaService.hsm.findMany({
      where: {
        projectId,
      },
    });
  }

  update(
    projectId: number,
    id: number,
    payload: UpdateHsmDto,
  ): Promise<HsmDto> {
    return this.prismaService.hsm.update({
      where: {
        projectId,
        id,
      },
      data: payload,
    });
  }

  remove(projectId: number, id: number): Promise<HsmDto> {
    return this.prismaService.hsm.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
