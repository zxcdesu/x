import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '../prisma.service';
import { CreateBotTemplateDto } from './dto/create-bot-template.dto';
import { UpdateBotTemplate } from './dto/update-bot-template.dto';

@Injectable()
export class BotTemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateBotTemplateDto) {
    return this.prismaService.botTemplate.create({
      data: payload as unknown as Prisma.BotTemplateCreateInput,
    });
  }

  findOne(id: number) {
    return this.prismaService.botTemplate.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.prismaService.botTemplate.findMany();
  }

  update(payload: UpdateBotTemplate) {
    return this.prismaService.botTemplate.update({
      where: {
        id: payload.id,
      },
      data: payload as unknown as Prisma.BotTemplateUpdateInput,
    });
  }

  remove(id: number) {
    return this.prismaService.botTemplate.delete({
      where: {
        id,
      },
    });
  }
}
