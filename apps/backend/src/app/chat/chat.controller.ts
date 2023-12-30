import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe } from '@nestjs/common';
import { PubSubService } from '../pubsub.service';
import { ChatDto } from './dto/chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly pubSubService: PubSubService) {}

  @RabbitSubscribe({
    routingKey: 'receiveChat',
    exchange: 'backend',
  })
  receive(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload() payload: ChatDto,
  ) {
    this.pubSubService.publish(PubSubService.chatReceived(projectId), {
      chatReceived: payload,
    });
  }
}
