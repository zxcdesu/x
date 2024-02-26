import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';

@Injectable()
export class IntegrationService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateIntegrationDto) {
    return this.prismaService.integration.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.integration.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.integration.findMany({
      where: {
        projectId,
      },
    });
  }

  update(projectId: number, id: number, payload: UpdateIntegrationDto) {
    return this.prismaService.integration.update({
      where: {
        projectId,
        id,
      },
      data: payload,
    });
  }

  remove(projectId: number, id: number) {
    return this.prismaService.integration.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
