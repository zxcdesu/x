import { Injectable, NotImplementedException } from '@nestjs/common';
import { ChannelRepository } from '../channel/channel.repository';
import { PrismaService } from '../prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly channelRepository: ChannelRepository,
  ) {}

  async create(payload: CreateMessageDto) {
    const chat = await this.prismaService.chat.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId: payload.projectId,
          id: payload.chatId,
        },
      },
      include: {
        channel: true,
      },
    });
    return this.prismaService.message.create({
      data: await this.channelRepository
        .get(chat.channel)
        .sendMessage(chat, payload),
    });
  }

  async findOne(chatId: number, id: number) {
    return this.prismaService.message.findUniqueOrThrow({
      where: {
        chatId_id: {
          chatId,
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

  async update(payload: UpdateMessageDto) {
    throw new NotImplementedException();
  }

  async remove(chatId: number, id: number) {
    throw new NotImplementedException();
  }
}
