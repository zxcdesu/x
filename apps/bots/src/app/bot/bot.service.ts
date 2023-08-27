import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateBotDto) {
    return this.prismaService.bot.create({
      data,
    });
  }

  async findOne(projectId: number, id: number) {
    return this.prismaService.bot.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }

  async findAll(projectId: number) {
    return this.prismaService.bot.findMany({
      where: {
        projectId,
      },
    });
  }

  async update(data: UpdateBotDto) {
    return this.prismaService.bot.update({
      where: {
        projectId_id: {
          projectId: data.projectId,
          id: data.id,
        },
      },
      data,
    });
  }

  async remove(projectId: number, id: number) {
    return this.prismaService.bot.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }
}
