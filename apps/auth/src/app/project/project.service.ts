import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindOneProjectDto } from './dto/find-one-project.dto';
import { RemoveProjectDto } from './dto/remove-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: number, payload: CreateProjectDto) {
    return this.prismaService.project.create({
      data: {
        ...payload,
        users: {
          create: {
            userId,
          },
        },
      },
    });
  }

  findOne(userId: number, payload: FindOneProjectDto) {
    return this.prismaService.project.findFirstOrThrow({
      where: {
        id: payload.id,
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: {
          where: {
            userId,
          },
        },
      },
    });
  }

  findAll(userId: number) {
    return this.prismaService.project.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async update(userId: number, payload: UpdateProjectDto) {
    await this.checkAccess(userId, payload);
    return this.prismaService.project.update({
      where: {
        id: payload.id,
      },
      data: payload,
    });
  }

  async remove(userId: number, payload: RemoveProjectDto) {
    await this.checkAccess(userId, payload);
    return this.prismaService.project.delete({
      where: payload,
    });
  }

  private async checkAccess(userId: number, payload: FindOneProjectDto) {
    await this.findOne(userId, payload);
    // TODO: check access
  }
}
