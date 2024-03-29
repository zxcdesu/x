import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-platform';
import { CreateChannelDto, UpdateChannelDto } from './dto';

@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateChannelDto) {
    return this.prismaService.channel.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.channel.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.channel.findMany({
      where: {
        projectId,
      },
    });
  }

  update(projectId: number, id: number, payload: UpdateChannelDto) {
    return this.prismaService.channel.update({
      where: {
        projectId,
        id,
      },
      data: payload,
    });
  }

  remove(projectId: number, id: number) {
    return this.prismaService.channel.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
