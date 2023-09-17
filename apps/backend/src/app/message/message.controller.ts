import { Controller } from '@nestjs/common';
import { MessageRmq } from '@platform/backend-type';
import { MessageDto } from './dto/message.dto';

@Controller()
export class MessageController {
  @MessageRmq.subscribeMessage()
  message(message: MessageDto) {
    console.log(message);
  }
}
