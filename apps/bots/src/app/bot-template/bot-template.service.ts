import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BotTemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  async create() {
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

  async update() {
    throw new NotImplementedException();
  }

  async remove() {
    throw new NotImplementedException();
  }
}
