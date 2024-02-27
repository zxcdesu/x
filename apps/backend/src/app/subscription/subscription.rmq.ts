import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateSubscriptionArgs } from './dto/create-subscription.args';
import { SubscriptionObject } from './dto/subscription.object';
import { UpdateSubscriptionArgs } from './dto/update-subscription.args';

@Injectable()
export class SubscriptionRmq extends RmqService {
  create(projectId: number, payload: CreateSubscriptionArgs) {
    return this.request<SubscriptionObject>({
      exchange: 'billing',
      routingKey: 'createSubscription',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number) {
    return this.request<SubscriptionObject>({
      exchange: 'billing',
      routingKey: 'findOneSubscription',
      payload: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateSubscriptionArgs) {
    return this.request<SubscriptionObject>({
      exchange: 'billing',
      routingKey: 'updateSubscription',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number) {
    return this.request<SubscriptionObject>({
      exchange: 'billing',
      routingKey: 'removeSubscription',
      payload: {
        projectId,
      },
    });
  }
}
