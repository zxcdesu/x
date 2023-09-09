import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateSubscriptionDto) {
    return this.prismaService.subscription.create({
      data: payload,
    });
  }

  async findOne(projectId: number) {
    return this.prismaService.subscription.findUniqueOrThrow({
      where: {
        projectId,
      },
    });
  }

  async update(payload: UpdateSubscriptionDto) {
    return this.prismaService.subscription.update({
      where: {
        projectId: payload.projectId,
      },
      data: payload,
    });
  }

  async remove(projectId: number) {
    return this.prismaService.subscription.delete({
      where: {
        projectId,
      },
    });
  }
}
