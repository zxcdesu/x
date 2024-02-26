import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { NotifyDto } from './dto/notify.dto';

@Injectable()
export class NotificationRmq extends RmqService {
  notify(userId: number, payload: NotifyDto) {
    return this.request({
      exchange: 'notifications',
      routingKey: 'notify',
      payload: {
        ...payload,
        userId,
      },
    });
  }
}
