import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateMessageDto) {
    return this.prismaService.message.create({
      data: payload,
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
    return this.prismaService.message.update({
      where: {
        chatId_id: {
          chatId: payload.chatId,
          id: payload.id,
        },
      },
      data: payload,
    });
  }

  async remove(chatId: number, id: number) {
    return this.prismaService.message.delete({
      where: {
        chatId_id: {
          chatId,
          id,
        },
      },
    });
  }
}
