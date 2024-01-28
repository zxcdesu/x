import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateHistoryDto) {
    return this.prismaService.history.create({
      data: payload,
    });
  }

  findAll(projectId?: number, userId?: number) {
    return this.prismaService.history.findMany({
      where: {
        projectId,
        userId,
      },
    });
  }
}
