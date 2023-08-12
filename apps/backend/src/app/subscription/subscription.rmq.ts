import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionRmq extends RmqService {
  private readonly exchange = 'billing';

  create(projectId: number, payload: CreateSubscriptionDto) {
    return this.request<SubscriptionDto>({
      exchange: this.exchange,
      routingKey: 'createSubscription',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<SubscriptionDto>({
      exchange: this.exchange,
      routingKey: 'findOneSubscription',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<SubscriptionDto[]>({
      exchange: this.exchange,
      routingKey: 'findAllSubscriptions',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateSubscriptionDto) {
    return this.request<SubscriptionDto>({
      exchange: this.exchange,
      routingKey: 'updateSubscription',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<SubscriptionDto>({
      exchange: this.exchange,
      routingKey: 'removeSubscription',
      payload: {
        projectId,
        id,
      },
    });
  }
}
