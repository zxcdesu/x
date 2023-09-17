import { Controller } from '@nestjs/common';
import { ChatRmq } from '@platform/backend-type';
import { ChatDto } from './dto/chat.dto';

@Controller()
export class ChatController {
  @ChatRmq.subscribeChat()
  chat(chat: ChatDto) {
    console.log(chat);
  }
}
