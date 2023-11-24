import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RemoveProjectUserDto } from './dto/remove-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';

@Injectable()
export class ProjectUserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, userId: number) {
    return this.prismaService.projectUser.create({
      data: {
        projectId,
        userId,
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
          userId: payload.id,
        },
      },
      data: {
        // TODO: access
      },
      include: {
        user: true,
      },
    });
  }

  async remove(
    projectId: number,
    userId: number,
    payload: RemoveProjectUserDto,
  ) {
    await this.checkAccess(projectId, userId);
    return this.prismaService.projectUser.delete({
      where: {
        projectId_userId: {
          projectId,
          userId: payload.id,
        },
      },
      include: {
        user: true,
      },
    });
  }

  private async checkAccess(projectId: number, userId: number): Promise<void> {
    await this.findOne(projectId, userId);
    // TODO: access
  }
}
