import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-auth';
import { CreateProjectUserDto, UpdateProjectUserDto } from './dto';

@Injectable()
export class ProjectUserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, userId: number, payload: CreateProjectUserDto) {
    return this.prismaService.projectUser.create({
      data: {
        projectId,
        userId,
        ...payload,
      },
      include: {
        user: true,
      },
    });
  }

  findOne(projectId: number, userId: number) {
    return this.prismaService.projectUser.findUniqueOrThrow({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      include: {
        user: true,
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.projectUser.findMany({
      where: {
        projectId,
      },
      include: {
        user: true,
      },
    });
  }

  update(projectId: number, userId: number, payload: UpdateProjectUserDto) {
    if (payload.roles) {
      payload.roles = Array.from(new Set(payload.roles).values());
    }

    return this.prismaService.projectUser.update({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      data: payload,
      include: {
        user: true,
      },
    });
  }

  remove(projectId: number, userId: number) {
    return this.prismaService.projectUser.delete({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      include: {
        user: true,
      },
    });
  }
}
