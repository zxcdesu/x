import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

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
