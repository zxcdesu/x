import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { UserId } from '@zxcdesu/util-user';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { HandleSubscriberDto } from './dto/handle-subscriber.dto';
import { SubscriberDto } from './dto/subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscriberService } from './subscriber.service';

@Controller()
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @RmqService.rpc({
    exchange: 'notifications',
    routingKey: 'createSubscriber',
    queue: 'createSubscriber',
  })
  @SerializeOptions({
    type: SubscriberDto,
  })
  create(
    @UserId() userId: number,
    @RabbitPayload() payload: CreateSubscriberDto,
  ): Promise<SubscriberDto> {
    return this.subscriberService.create(userId, payload);
  }

  @RmqService.rpc({
    exchange: 'notifications',
    routingKey: 'findOneSubscriber',
    queue: 'findOneSubscriber',
  })
  @SerializeOptions({
    type: SubscriberDto,
  })
  findAll(@UserId() userId: number): Promise<SubscriberDto[]> {
    return this.subscriberService.findAll(userId);
  }

  @RmqService.rpc({
    exchange: 'notifications',
    routingKey: 'updateSubscriber',
    queue: 'updateSubscriber',
  })
  @SerializeOptions({
    type: SubscriberDto,
  })
  update(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateSubscriberDto,
  ) {
    return this.subscriberService.update(userId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'notifications',
    routingKey: 'removeSubscriber',
    queue: 'removeSubscriber',
  })
  @SerializeOptions({
    type: SubscriberDto,
  })
  remove(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.subscriberService.remove(userId, id);
  }

  @RmqService.subscribe({
    exchange: 'notifications',
    routingKey: 'handleSubscriber',
    queue: 'handleSubscriber',
  })
  handleWebhook(@RabbitPayload() payload: HandleSubscriberDto) {
    return this.subscriberService.handle(payload);
  }
}
