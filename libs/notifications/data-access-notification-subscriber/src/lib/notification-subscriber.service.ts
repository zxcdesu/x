import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-notifications';
import {
  CreateNotificationSubscriberDto,
  UpdateNotificationSubscriberDto,
} from './dto';

@Injectable()
export class NotificationSubscriberService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: number, payload: CreateNotificationSubscriberDto) {
    return this.prismaService.notificationSubscriber.create({
      data: {
        userId,
        ...payload,
      },
    });
  }

  findAll(userId: number) {
    return this.prismaService.notificationSubscriber.findMany({
      where: {
        userId,
      },
    });
  }

  update(userId: number, id: number, payload: UpdateNotificationSubscriberDto) {
    return this.prismaService.notificationSubscriber.update({
      where: {
        userId,
        id,
      },
      data: payload,
    });
  }

  remove(userId: number, id: number) {
    return this.prismaService.notificationSubscriber.delete({
      where: {
        userId,
        id,
      },
    });
  }
}
