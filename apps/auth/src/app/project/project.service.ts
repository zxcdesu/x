import { Injectable } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { PrismaService } from '../prisma.service';
import { ProjectUserService } from '../project-user/project-user.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindOneProjectDto } from './dto/find-one-project.dto';
import { RemoveProjectDto } from './dto/remove-project.dto';
import { SignInProjectDto } from './dto/sign-in-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectJwtPayload } from './project-jwt-payload.interface';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService<ProjectJwtPayload>,
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

  update(userId: number, payload: UpdateProjectDto) {
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

  remove(userId: number, payload: RemoveProjectDto) {
    return this.prismaService.project.delete({
      where: {
        id: payload.id,
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

  async signIn(userId: number, payload: SignInProjectDto) {
    await this.projectUserService.findOne(payload.id, userId);
    return {
      token: this.jwtService.sign({
        id: userId,
        project: {
          id: payload.id,
        },
      }),
    };
  }
}
