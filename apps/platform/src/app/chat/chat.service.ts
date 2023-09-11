import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateChatDto) {
    return this.prismaService.chat.create({
      data: payload,
    });
  }

  async findOne(projectId: number, id: number) {
    return this.prismaService.chat.findUniqueOrThrow({
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

  async update(payload: UpdateChatDto) {
    return this.prismaService.chat.update({
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
    return this.prismaService.chat.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }
}
