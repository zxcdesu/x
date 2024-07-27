import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { CreateTagDto, TagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateTagDto): Promise<TagDto> {
    return this.prismaService.tag.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number): Promise<TagDto> {
    return this.prismaService.tag.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number): Promise<TagDto[]> {
    return this.prismaService.tag.findMany({
      where: {
        projectId,
      },
    });
  }

  update(
    projectId: number,
    id: number,
    payload: UpdateTagDto,
  ): Promise<TagDto> {
    return this.prismaService.tag.update({
      where: {
        projectId,
        id,
      },
      data: payload,
    });
  }

  remove(projectId: number, id: number): Promise<TagDto> {
    return this.prismaService.tag.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
