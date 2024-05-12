import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import {
  NotificationSenderService,
  SendNotificationDto,
} from '@zxcdesu/feature-notification-sender';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class NotificationSenderController {
  constructor(
    private readonly notificationSenderService: NotificationSenderService,
  ) {}

  @RmqService.subscribe({
    exchange: 'notification',
    routingKey: 'sendNotification',
    queue: 'sendNotification',
  })
  send(@RabbitPayload() payload: SendNotificationDto): Promise<void> {
    return this.notificationSenderService.send(payload);
  }
}
