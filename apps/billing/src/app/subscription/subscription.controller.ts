import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import {
  CreateSubscriptionDto,
  SubscriptionDto,
  SubscriptionService,
  UpdateSubscriptionDto,
} from '@zxcdesu/data-access-subscription';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'createSubscription',
    queue: 'createSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'findOneSubscription',
    queue: 'findOneSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findOne(@ProjectId() projectId: number): Promise<SubscriptionDto> {
    return this.subscriptionService.findOne(projectId);
  }

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'updateSubscription',
    queue: 'updateSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: UpdateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.update(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'removeSubscription',
    queue: 'removeSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  remove(@ProjectId() projectId: number): Promise<SubscriptionDto> {
    return this.subscriptionService.remove(projectId);
  }
}
