import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateEventDto) {
    return this.prismaService.event.create({
      data: payload,
    });
  }

  async findOne(
    projectId: number | undefined,
    userId: number | number,
    id: number,
  ) {
    return this.prismaService.event.findUniqueOrThrow({
      where: {
        projectId_userId_id: {
          projectId,
          userId,
          id,
        },
      },
    });
  }

  async findAll(projectId: number | number, userId: number | undefined) {
    return this.prismaService.event.findMany({
      where: {
        projectId,
        userId,
      },
    });
  }
}
