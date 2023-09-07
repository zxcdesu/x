import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRmq } from './message.rmq';

@Injectable()
export class MessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly messageRmq: MessageRmq,
  ) {}

  async create(payload: CreateMessageDto) {
    return this.prismaService.message.create({
      data: payload,
    });
  }

  async findOne(projectId: number, id: number) {
    return this.prismaService.message.findUniqueOrThrow({
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

  async update(payload: UpdateMessageDto) {
    return this.prismaService.message.update({
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
    return this.prismaService.message.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }
}
