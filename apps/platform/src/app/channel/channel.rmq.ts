import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { ChannelPayload, CreateChannel } from '@platform/platform-type';

@Injectable()
export class ChannelRmq extends RmqService {
  create(payload: CreateChannel<any>) {
    return this.request<ChannelPayload<any>>({
      exchange: `platform-${payload.type.toLowerCase()}`,
      routingKey: 'createChannel',
      payload,
    });
  }
}
