import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';

@Injectable()
export class AdminRmq extends RmqService {
  check(userId: number) {
    return this.request<boolean>({
      exchange: 'admin',
      routingKey: 'checkAdmin',
      payload: {
        userId,
      },
    });
  }
}
