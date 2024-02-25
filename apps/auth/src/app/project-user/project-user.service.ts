import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';

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
    const roles = new Set(payload.roles);
    return this.prismaService.projectUser.update({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
      data: Object.assign(payload, {
        roles: Array.from(roles.values()),
      }),
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
