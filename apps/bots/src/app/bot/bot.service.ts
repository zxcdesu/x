import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateBotDto) {
    return this.prismaService.bot.create({
      data: payload,
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.bot.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }

  findAll(projectId: number) {
    return this.prismaService.bot.findMany({
      where: {
        projectId,
      },
    });
  }

  update(payload: UpdateBotDto) {
    return this.prismaService.bot.update({
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
