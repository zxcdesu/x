import { Injectable } from '@nestjs/common';
import { SendNotificationDto } from '@zxcdesu/feature-notification-sender';
import { RmqService } from '@zxcdesu/util-rmq';

@Injectable()
export class NotificationRmq extends RmqService {
  send(userId: number, payload: SendNotificationDto) {
    return this.request({
      exchange: 'notifications',
      routingKey: 'sendNotification',
      payload: {
        userId,
        ...payload,
      },
    });
  }
}
