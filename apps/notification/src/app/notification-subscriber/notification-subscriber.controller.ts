import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateNotificationSubscriberDto,
  NotificationSubscriberDto,
  NotificationSubscriberService,
} from '@zxcdesu/data-access-notification-subscriber';
import { UserId } from '@zxcdesu/data-access-user';
import {
  HandleNotificationSubscriberDto,
  NotificationSubscriberRepository,
} from '@zxcdesu/feature-notification-subscriber-provider';

@Controller()
export class NotificationSubscriberController {
  constructor(
    private readonly notificationSubscriberService: NotificationSubscriberService,
    private readonly notificationSubscriberRepository: NotificationSubscriberRepository,
  ) {}

  // @RmqService.rpc({
  //   exchange: 'notification',
  //   routingKey: 'createSubscriber',
  //   queue: 'createSubscriber',
  // })
  @SerializeOptions({
    type: NotificationSubscriberDto,
  })
  create(
    @UserId() userId: number,
    @RabbitPayload() payload: CreateNotificationSubscriberDto,
  ): Promise<NotificationSubscriberDto> {
    return this.notificationSubscriberService.create(userId, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'notification',
  //   routingKey: 'findOneSubscriber',
  //   queue: 'findOneSubscriber',
  // })
  @SerializeOptions({
    type: NotificationSubscriberDto,
  })
  findAll(@UserId() userId: number): Promise<NotificationSubscriberDto[]> {
    return this.notificationSubscriberService.findAll(userId);
  }

  // @RmqService.rpc({
  //   exchange: 'notification',
  //   routingKey: 'updateSubscriber',
  //   queue: 'updateSubscriber',
  // })
  @SerializeOptions({
    type: NotificationSubscriberDto,
  })
  update(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: NotificationSubscriberDto,
  ) {
    return this.notificationSubscriberService.update(userId, id, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'notification',
  //   routingKey: 'removeSubscriber',
  //   queue: 'removeSubscriber',
  // })
  @SerializeOptions({
    type: NotificationSubscriberDto,
  })
  remove(
    @UserId() userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.notificationSubscriberService.remove(userId, id);
  }

  // @RmqService.subscribe({
  //   exchange: 'notification',
  //   routingKey: 'handleSubscriber',
  //   queue: 'handleSubscriber',
  // })
  handleWebhook(@RabbitPayload() payload: HandleNotificationSubscriberDto) {
    return this.notificationSubscriberRepository
      .get(payload.provider)
      .handleWebhook(payload);
  }
}
