import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { AssigneeType } from '../contact/dto/assignee-type.enum';
import { PubSubService } from '../pubsub.service';
import { HandleChatDto } from './dto/receive-chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly pubSubService: PubSubService) {}

  @RmqService.subscribe({
    exchange: 'backend',
    routingKey: 'handleChat',
    queue: 'handleChat',
  })
  handle(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: HandleChatDto,
  ) {
    this.pubSubService.publish(
      PubSubService.chatReceived(
        projectId,
        payload.chat.contact.assignedTo?.type === AssigneeType.User &&
          payload.chat.contact.assignedTo,
      ),
      {
        chatReceived: payload.chat,
      },
    );
  }
}
