import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe } from '@nestjs/common';
import { PubSubService } from '../pubsub.service';
import { MessageDto } from './dto/message.dto';

@Controller()
export class MessageController {
  constructor(private readonly pubSubService: PubSubService) {}

  @RabbitSubscribe({
    routingKey: 'receiveMessage',
    exchange: 'backend',
  })
  receive(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('chatId', ParseIntPipe) chatId: number,
    @RabbitPayload() payload: MessageDto,
  ) {
    this.pubSubService.publish(
      PubSubService.messageReceived(projectId, chatId),
      {
        messageReceived: payload,
      },
    );
  }
}
