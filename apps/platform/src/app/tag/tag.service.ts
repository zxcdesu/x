import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateTagDto) {
    return this.prismaService.tag.create({
      data: {
        projectId,
        ...payload,
      },
      include: {
        children: true,
        parent: true,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.tag.findUniqueOrThrow({
      where: {
        projectId,
        id,
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

  update(projectId: number, id: number, payload: UpdateTagDto) {
    return this.prismaService.tag.update({
      where: {
        projectId,
        id,
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
        projectId,
        id,
      },
      include: {
        children: true,
        parent: true,
      },
    });
  }
}
