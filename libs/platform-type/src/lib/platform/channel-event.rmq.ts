import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/nestjs-rabbitmq';
import { ChannelEvent } from './channel-event.interface';

@Injectable()
export class ChannelEventRmq extends RmqService {
  static subscribeEvent = () =>
    ChannelEventRmq.subscribe({
      exchange: 'platform',
      routingKey: 'event',
    });

  event(payload: ChannelEvent) {
    return this.publish('platform', 'event', payload);
  }
}
