import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { EventPayload } from '@platform/platform-type';

@Controller()
export class EventController {
  @RabbitSubscribe({
    routingKey: 'event',
    exchange: 'platform-telegram',
  })
  event(@RabbitPayload() payload: EventPayload) {
    console.log(payload);
  }
}
