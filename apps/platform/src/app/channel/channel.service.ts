import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ChannelRepository } from './channel.repository';
import { CreateChannelDto } from './dto/create-channel.dto';
import { HandleChannelDto } from './dto/handle-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly channelRepository: ChannelRepository,
  ) {}

  async create(projectId: number, payload: CreateChannelDto) {
    const channel = await this.prismaService.channel.create({
      data: {
        projectId,
        ...payload,
      },
    });

    return this.prismaService.channel.update({
      where: {
        id: channel.id,
      },
      data: await this.channelRepository.get(channel).create(),
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

  async handle(payload: HandleChannelDto) {
    const channel = await this.prismaService.channel.findUnique({
      where: {
        id: payload.channelId,
      },
    });
    if (channel) {
      return this.channelRepository.get(channel).handleWebhook(payload);
    }
  }
}
