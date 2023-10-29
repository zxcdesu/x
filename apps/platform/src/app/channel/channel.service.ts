import { Injectable } from '@nestjs/common';
import { ChannelEvent } from '@platform/platform-type';
import { ChannelStatus, PrismaService } from '../prisma.service';
import { ChannelRepository } from './channel.repository';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly channelRepository: ChannelRepository,
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
      data: await this.channelRepository.get(channel).initialize(),
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.channel.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
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

  update(payload: UpdateChannelDto) {
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

  remove(projectId: number, id: number) {
    return this.prismaService.channel.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }

  async handleEvent(payload: ChannelEvent) {
    const channel = await this.prismaService.channel.findUnique({
      where: {
        id: payload.param.channelId,
      },
    });
    if (channel) {
      return this.channelRepository.get(channel).handleEvent(payload);
    }
  }
}
