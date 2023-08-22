import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectUserService } from '../project-user/project-user.service';
import { TokenService } from '../token/token.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindOneProjectDto } from './dto/find-one-project.dto';
import { RemoveProjectDto } from './dto/remove-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectTokenPayload } from './project-token-payload.interface';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService<ProjectTokenPayload>,
    private readonly projectUserService: ProjectUserService,
  ) {}

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
      include: {
        users: {
          where: {
            userId,
          },
        },
      },
    });
  }

  async signIn(userId: number, projectId: number) {
    await this.projectUserService.findOne(projectId, userId);
    return {
      token: this.tokenService.sign({
        id: userId,
        project: {
          id: projectId,
        },
      }),
    };
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
      include: {
        users: {
          where: {
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
      include: {
        users: {
          where: {
            userId,
          },
        },
      },
    });
  }

  async remove(userId: number, payload: RemoveProjectDto) {
    await this.checkAccess(userId, payload);
    return this.prismaService.project.delete({
      where: payload,
      include: {
        users: {
          where: {
            userId,
          },
        },
      },
    });
  }

  private async checkAccess(userId: number, payload: FindOneProjectDto) {
    await this.findOne(userId, payload);
    // TODO: check access
  }
}
