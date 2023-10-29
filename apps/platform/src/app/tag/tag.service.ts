import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateTagDto) {
    return this.prismaService.tag.create({
      data: payload,
      include: {
        children: true,
        parent: true,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.tag.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      include: {
        children: true,
        parent: true,
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.tag.findMany({
      where: {
        projectId,
      },
      include: {
        children: true,
        parent: true,
      },
    });
  }

  update(payload: UpdateTagDto) {
    return this.prismaService.tag.update({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.id,
        },
      },
      data: payload,
      include: {
        children: true,
        parent: true,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.prismaService.tag.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
      include: {
        children: true,
        parent: true,
      },
    });
  }
}
