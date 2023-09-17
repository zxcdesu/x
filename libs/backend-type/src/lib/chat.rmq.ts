import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';

@Injectable()
export class ChatRmq extends RmqService {
  static subscribeChat = () =>
    RabbitSubscribe({
      exchange: 'backend',
      routingKey: 'chat',
    });

  chat<T>(payload: T) {
    return this.publish('backend', 'chat', payload);
  }
}
