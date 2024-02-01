import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/nestjs-rabbitmq';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { SubscriberDto } from './dto/subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Injectable()
export class SubscriberRmq extends RmqService {
  create(userId: number, payload: CreateSubscriberDto) {
    return this.request<SubscriberDto>({
      exchange: 'notifications',
      routingKey: 'createSubscriber',
      payload: {
        ...payload,
        userId,
      },
    });
  }

  findOne(userId: number) {
    return this.request<SubscriberDto>({
      exchange: 'notifications',
      routingKey: 'findOneSubscriber',
      payload: {
        userId,
      },
    });
  }

  update(userId: number, payload: UpdateSubscriberDto) {
    return this.request<SubscriberDto>({
      exchange: 'notifications',
      routingKey: 'updateSubscriber',
      payload: {
        ...payload,
        userId,
      },
    });
  }

  remove(userId: number) {
    return this.request<SubscriberDto>({
      exchange: 'notifications',
      routingKey: 'removeSubscriber',
      payload: {
        userId,
      },
    });
  }
}
