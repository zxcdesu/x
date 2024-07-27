import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { CreateFieldDto, FieldDto, UpdateFieldDto } from './dto';

@Injectable()
export class FieldService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateFieldDto): Promise<FieldDto> {
    return this.prismaService.field.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number): Promise<FieldDto> {
    return this.prismaService.field.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number): Promise<FieldDto[]> {
    return this.prismaService.field.findMany({
      where: {
        projectId,
      },
    });
  }

  update(
    projectId: number,
    id: number,
    payload: UpdateFieldDto,
  ): Promise<FieldDto> {
    return this.prismaService.field.update({
      where: {
        projectId,
        id,
      },
      data: payload,
    });
  }

  remove(projectId: number, id: number): Promise<FieldDto> {
    return this.prismaService.field.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
