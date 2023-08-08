import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateProjectUserDto } from './project-user.dto';

@Injectable()
export class ProjectUserService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async update(
    projectId: number,
    userId: number,
    payload: UpdateProjectUserDto,
  ) {
    await this.checkAccess(projectId, userId);
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

  async remove(projectId: number, userId: number) {
    await this.checkAccess(projectId, userId);
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

  private async checkAccess(projectId: number, userId: number) {
    await this.findOne(projectId, userId);
    // TODO: check access
  }
}
