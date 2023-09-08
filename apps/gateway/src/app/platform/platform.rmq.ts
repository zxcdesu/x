import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { EventPayload } from '@platform/platform-type';

@Injectable()
export class PlatformRmq extends RmqService {
  event(platform: string, payload: EventPayload) {
    return this.publish(`platform-${platform}`, 'event', payload);
  }
}
