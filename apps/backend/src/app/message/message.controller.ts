import { RabbitSubscribe, RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';

@Controller()
export class MessageController {
  @RabbitSubscribe({
    routingKey: 'receiveMessage',
    exchange: 'backend',
  })
  receive(@RabbitPayload() payload: any) {
    console.log(payload);
  }
}
