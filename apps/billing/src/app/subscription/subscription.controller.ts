import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/data-access-project';
import {
  CreateSubscriptionDto,
  SubscriptionDto,
  SubscriptionService,
  UpdateSubscriptionDto,
} from '@zxcdesu/data-access-subscription';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'createSubscription',
    queue: 'billing.createSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.create(projectId, payload);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'findOneSubscription',
    queue: 'billing.findOneSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findOne(@ProjectId() projectId: number) {
    return this.subscriptionService.findOne(projectId);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'updateSubscription',
    queue: 'billing.updateSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(projectId, payload);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'removeSubscription',
    queue: 'billing.removeSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  remove(@ProjectId() projectId: number) {
    return this.subscriptionService.remove(projectId);
  }
}
