import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { ChannelEvent } from './channel-event.interface';

@Injectable()
export class ChannelEventRmq extends RmqService {
  static subscribe = () =>
    RabbitSubscribe({
      exchange: 'platform',
      routingKey: 'event',
    });

  event(payload: ChannelEvent) {
    return this.publish('platform', 'event', payload);
  }
}
