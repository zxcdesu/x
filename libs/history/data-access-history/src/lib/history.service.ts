import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-history';
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
        OR: [
          {
            projectId,
          },
          {
            userId,
          },
        ],
      },
    });
  }
}
