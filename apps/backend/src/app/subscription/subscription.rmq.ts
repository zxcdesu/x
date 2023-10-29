import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionRmq extends RmqService {
  create(projectId: number, payload: CreateSubscriptionDto) {
    return this.request<SubscriptionDto>({
      exchange: 'billing',
      routingKey: 'createSubscription',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<SubscriptionDto>({
      exchange: 'billing',
      routingKey: 'findOneSubscription',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<SubscriptionDto[]>({
      exchange: 'billing',
      routingKey: 'findAllSubscriptions',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateSubscriptionDto) {
    return this.request<SubscriptionDto>({
      exchange: 'billing',
      routingKey: 'updateSubscription',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<SubscriptionDto>({
      exchange: 'billing',
      routingKey: 'removeSubscription',
      payload: {
        projectId,
        id,
      },
    });
  }
}
