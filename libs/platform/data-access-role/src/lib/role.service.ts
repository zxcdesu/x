import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateRoleDto): Promise<RoleDto> {
    return this.prismaService.role.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number): Promise<RoleDto> {
    return this.prismaService.role.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number): Promise<RoleDto[]> {
    return this.prismaService.role.findMany({
      where: {
        projectId,
      },
    });
  }

  update(
    projectId: number,
    id: number,
    payload: UpdateRoleDto,
  ): Promise<RoleDto> {
    return this.prismaService.role.update({
      where: {
        projectId,
        id,
      },
      data: payload,
    });
  }

  remove(projectId: number, id: number): Promise<RoleDto> {
    return this.prismaService.role.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
