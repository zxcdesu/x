import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBotTemplateDto } from './dto/create-bot-template.dto';
import { UpdateBotTemplate } from './dto/update-bot-template.dto';

@Injectable()
export class BotTemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateBotTemplateDto) {
    throw new NotImplementedException();
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

  async update(payload: UpdateBotTemplate) {
    throw new NotImplementedException();
  }

  async remove(id: number) {
    throw new NotImplementedException();
  }
}
