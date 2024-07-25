import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';

@Injectable()
export class AdminRmq<T extends boolean> extends RmqFactory {
  static validate() {
    return this.rpc({
      exchange: 'admin',
      routingKey: 'validateAdmin',
      queue: 'validateAdmin',
    });
  }

  validate(userId: number): Promise<T> {
    return this.request<T>({
      exchange: 'admin',
      routingKey: 'validateAdmin',
      payload: {
        userId,
      },
    });
  }
}
