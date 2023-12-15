import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';

@Controller()
export class ChatController {
  @RabbitSubscribe({
    routingKey: 'receiveChat',
    exchange: 'backend',
  })
  receive(@RabbitPayload() payload: any) {
    console.log(payload);
  }
}
