import { Injectable } from '@nestjs/common';
import { ChannelStatus, PrismaService } from '../prisma.service';
import { ChannelRmq } from './channel.rmq';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly channelRmq: ChannelRmq,
  ) {}

  async create(payload: CreateChannelDto) {
    const channel = await this.prismaService.channel.create({
      data: {
        ...payload,
        status: ChannelStatus.Connecting,
      },
    });

    return this.prismaService.channel.update({
      where: {
        id: channel.id,
      },
      data: await this.channelRmq.create(channel),
    });
  }

  async findOne(projectId: number, id: number) {
    return this.prismaService.channel.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }

  async findAll(projectId: number) {
    return this.prismaService.channel.findMany({
      where: {
        projectId,
      },
    });
  }

  async update(payload: UpdateChannelDto) {
    return this.prismaService.channel.update({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.id,
        },
      },
      data: payload,
    });
  }

  async remove(projectId: number, id: number) {
    return this.prismaService.channel.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }
}
