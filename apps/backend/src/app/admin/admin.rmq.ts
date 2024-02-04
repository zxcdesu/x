import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/nestjs-rabbitmq';

@Injectable()
export class AdminRmq extends RmqService {
  check(userId: number) {
    return this.request<boolean>({
      exchange: 'admin',
      routingKey: 'check',
      payload: {
        userId,
      },
    });
  }
}
