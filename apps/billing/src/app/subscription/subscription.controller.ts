import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'createSubscription',
    queue: 'createSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  create(@RabbitPayload() payload: CreateSubscriptionDto) {
    return this.subscriptionService.create(payload);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'findOneSubscription',
    queue: 'findOneSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findOne(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.subscriptionService.findOne(projectId);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'findAllSubscriptions',
    queue: 'findAllSubscriptions',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findAll() {
    return this.subscriptionService.findAll();
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'updateSubscription',
    queue: 'updateSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  update(@RabbitPayload() payload: UpdateSubscriptionDto) {
    return this.subscriptionService.update(payload);
  }

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'removeSubscription',
    queue: 'removeSubscription',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  remove(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.subscriptionService.remove(projectId);
  }
}
