import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';

@Injectable()
export class IntegrationService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateIntegrationDto) {
    return this.prismaService.integration.create({
      data: payload,
    });
  }

  findOne(projectId: number, id: string) {
    return this.prismaService.integration.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
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

  update(payload: UpdateIntegrationDto) {
    return this.prismaService.integration.update({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.id,
        },
      },
      data: payload,
    });
  }

  remove(projectId: number, id: string) {
    return this.prismaService.integration.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }
}
