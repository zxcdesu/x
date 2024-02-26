import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { SendNotificationDto } from './dto/send-notification.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @RmqService.subscribe({
    exchange: 'notifications',
    routingKey: 'sendNotification',
    queue: 'sendNotification',
  })
  send(@RabbitPayload() payload: SendNotificationDto): Promise<void> {
    return this.notificationService.send(payload);
  }
}
