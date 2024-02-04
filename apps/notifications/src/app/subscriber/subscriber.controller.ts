import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { HandleWebhookDto } from './dto/handle-webhook.dto';
import { SubscriberDto } from './dto/subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscriberService } from './subscriber.service';

@Controller()
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @RabbitRPC({
    exchange: 'notifications',
    routingKey: 'createSubscriber',
    queue: 'notifications.createSubscriber',
  })
  @SerializeOptions({
    type: SubscriberDto,
  })
  create(@RabbitPayload() payload: CreateSubscriberDto) {
    return this.subscriberService.create(payload);
  }

  @RabbitRPC({
    exchange: 'notifications',
    routingKey: 'findOneSubscriber',
    queue: 'notifications.findOneSubscriber',
  })
  @SerializeOptions({
    type: SubscriberDto,
  })
  findOne(@RabbitPayload('userId', ParseIntPipe) userId: number) {
    return this.subscriberService.findOne(userId);
  }

  @RabbitRPC({
    exchange: 'notifications',
    routingKey: 'updateSubscriber',
    queue: 'notifications.updateSubscriber',
  })
  @SerializeOptions({
    type: SubscriberDto,
  })
  update(@RabbitPayload() payload: UpdateSubscriberDto) {
    return this.subscriberService.update(payload);
  }

  @RabbitRPC({
    exchange: 'notifications',
    routingKey: 'removeSubscriber',
    queue: 'notifications.removeSubscriber',
  })
  @SerializeOptions({
    type: SubscriberDto,
  })
  remove(@RabbitPayload('userId', ParseIntPipe) userId: number) {
    return this.subscriberService.remove(userId);
  }

  @RabbitSubscribe({
    exchange: 'notifications',
    routingKey: 'handleWebhook',
    queue: 'notifications.handleWebhook',
  })
  handleWebhook(@RabbitPayload() payload: HandleWebhookDto) {
    return this.subscriberService.handleWebhook(payload);
  }
}
