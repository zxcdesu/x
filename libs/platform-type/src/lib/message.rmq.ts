import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';

@Injectable()
export class MessageRmq extends RmqService {
  static subscribeMessage = () =>
    RabbitSubscribe({
      exchange: 'backend',
      routingKey: 'message',
    });

  message<T>(payload: T) {
    return this.publish('backend', 'message', payload);
  }
}
