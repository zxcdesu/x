import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@zxcdesu/prisma-bot';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Injectable()
export class BotService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateBotDto) {
    return this.prismaService.bot.create({
      data: {
        projectId,
        ...payload,
      } as unknown as Prisma.BotCreateInput,
    });
  }

  findOne(projectId: number, id: number) {
    return this.prismaService.bot.findUniqueOrThrow({
      where: {
        projectId,
        id,
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

  update(projectId: number, id: number, payload: UpdateBotDto) {
    return this.prismaService.bot.update({
      where: {
        projectId,
        id,
      },
      data: payload as unknown as Prisma.BotUpdateInput,
    });
  }

  remove(projectId: number, id: number) {
    return this.prismaService.bot.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
