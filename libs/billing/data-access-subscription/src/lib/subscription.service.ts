import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-billing';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateSubscriptionDto) {
    return this.prismaService.subscription.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number) {
    return this.prismaService.subscription.findUniqueOrThrow({
      where: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateSubscriptionDto) {
    return this.prismaService.subscription.update({
      where: {
        projectId,
      },
      data: payload,
    });
  }

  remove(projectId: number) {
    return this.prismaService.subscription.delete({
      where: {
        projectId,
      },
    });
  }
}
