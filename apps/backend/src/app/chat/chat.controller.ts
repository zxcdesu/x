import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { PubSubService } from '../pubsub.service';
import { ReceiveChatDto } from './dto/receive-chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly pubSubService: PubSubService) {}

  @RabbitSubscribe({
    routingKey: 'receiveChat',
    exchange: 'backend',
  })
  receive(@RabbitPayload() payload: ReceiveChatDto) {
    this.pubSubService.publish(PubSubService.chatReceived(payload.projectId), {
      chatReceived: payload.chat,
    });
  }
}
