import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { RoleUserDto } from './dto';

@Injectable()
export class RoleUserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    projectId: number,
    userId: number,
    roleId: number,
  ): Promise<RoleUserDto> {
    return this.prismaService.roleUser.create({
      data: {
        userId,
        role: {
          connect: {
            projectId,
            id: roleId,
          },
        },
      },
      include: {
        role: true,
      },
    });
  }

  findAll(
    projectId: number,
    userId?: number,
    roleId?: number,
  ): Promise<RoleUserDto[]> {
    return this.prismaService.roleUser.findMany({
      where: {
        role: {
          projectId,
        },
        userId,
        roleId,
      },
      include: {
        role: true,
      },
    });
  }

  remove(
    projectId: number,
    userId: number,
    roleId: number,
  ): Promise<RoleUserDto> {
    return this.prismaService.roleUser.delete({
      where: {
        roleId_userId: {
          roleId,
          userId,
        },
        role: {
          projectId,
        },
      },
      include: {
        role: true,
      },
    });
  }
}
