import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { NotifyDto } from './dto/notify.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @RabbitSubscribe({
    exchange: 'notifications',
    routingKey: 'notify',
  })
  notify(@RabbitPayload() payload: NotifyDto) {
    return this.notificationService.notify(payload);
  }
}
