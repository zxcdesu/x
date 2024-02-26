import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { HandleSubscriberDto } from './dto/handle-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly subscriberRepository: SubscriberRepository,
  ) {}

  create(userId: number, payload: CreateSubscriberDto) {
    return this.prismaService.subscriber.create({
      data: {
        userId,
        ...payload,
      },
    });
  }

  findAll(userId: number) {
    return this.prismaService.subscriber.findMany({
      where: {
        userId,
      },
    });
  }

  update(userId: number, id: number, payload: UpdateSubscriberDto) {
    return this.prismaService.subscriber.update({
      where: {
        userId,
        id,
      },
      data: payload,
    });
  }

  remove(userId: number, id: number) {
    return this.prismaService.subscriber.delete({
      where: {
        userId,
        id,
      },
    });
  }

  handle(payload: HandleSubscriberDto) {
    return this.subscriberRepository
      .get(payload.provider)
      .handleWebhook(payload);
  }
}
