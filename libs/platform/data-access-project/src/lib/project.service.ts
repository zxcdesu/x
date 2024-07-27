import { Injectable } from '@nestjs/common';
import { Grant, PrismaService } from '@zxcdesu/prisma-platform';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: number, payload: CreateProjectDto): Promise<ProjectDto> {
    return this.prismaService.project.create({
      data: {
        roles: {
          create: {
            grants: [Grant.Root],
            users: {
              create: {
                userId,
              },
            },
          },
        },
        ...payload,
      },
    });
  }

  findOne(userId: number, id: number): Promise<ProjectDto> {
    return this.prismaService.project.findUniqueOrThrow({
      where: {
        roles: {
          some: {
            users: {
              some: {
                userId,
              },
            },
          },
        },
        id,
      },
    });
  }

  findAll(userId: number): Promise<ProjectDto[]> {
    return this.prismaService.project.findMany({
      where: {
        roles: {
          some: {
            users: {
              some: {
                userId,
              },
            },
          },
        },
      },
    });
  }

  update(
    userId: number,
    id: number,
    payload: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.prismaService.project.update({
      where: {
        roles: {
          some: {
            users: {
              some: {
                userId,
              },
            },
          },
        },
        id,
      },
      data: payload,
    });
  }

  remove(userId: number, id: number): Promise<ProjectDto> {
    return this.prismaService.project.delete({
      where: {
        roles: {
          some: {
            users: {
              some: {
                userId,
              },
            },
          },
        },
        id,
      },
    });
  }
}
