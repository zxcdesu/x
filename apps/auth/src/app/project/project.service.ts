import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
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
      include: {
        users: {
          where: {
            userId,
          },
        },
      },
    });
  }

  findOne(userId: number, id: number) {
    return this.prismaService.project.findFirstOrThrow({
      where: {
        id,
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

  update(userId: number, id: number, payload: UpdateProjectDto) {
    return this.prismaService.project.update({
      where: {
        id,
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

  remove(userId: number, id: number) {
    return this.prismaService.project.delete({
      where: {
        id,
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
}
