import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @RabbitRPC({
    routingKey: 'createSubscription',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  create(@RabbitPayload() payload: CreateSubscriptionDto) {
    return this.subscriptionService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneSubscription',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findOne(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.subscriptionService.findOne(projectId);
  }

  @RabbitRPC({
    routingKey: 'findAllSubscriptions',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findAll() {
    return this.subscriptionService.findAll();
  }

  @RabbitRPC({
    routingKey: 'updateSubscription',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  update(@RabbitPayload() payload: UpdateSubscriptionDto) {
    return this.subscriptionService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeSubscription',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: SubscriptionDto,
  })
  remove(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.subscriptionService.remove(projectId);
  }
}
