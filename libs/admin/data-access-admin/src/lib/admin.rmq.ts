import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';

@Injectable()
export class AdminRmq<T extends boolean> extends RmqFactory {
  static check() {
    return this.rpc({
      exchange: 'admin',
      routingKey: 'checkAdmin',
      queue: 'checkAdmin',
    });
  }

  check(userId: number) {
    return this.request<T>({
      exchange: 'admin',
      routingKey: 'checkAdmin',
      payload: {
        userId,
      },
    });
  }
}
