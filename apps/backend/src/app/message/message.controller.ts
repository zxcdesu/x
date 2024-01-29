import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { PubSubService } from '../pubsub.service';
import { ReceiveMessageDto } from './dto/receive-message.dto';

@Controller()
export class MessageController {
  constructor(private readonly pubSubService: PubSubService) {}

  @RabbitSubscribe({
    routingKey: 'receiveMessage',
    exchange: 'backend',
  })
  receive(@RabbitPayload() payload: ReceiveMessageDto) {
    this.pubSubService.publish(
      PubSubService.messageReceived(payload.projectId, payload.chatId),
      {
        messageReceived: payload.message,
      },
    );
  }
}
