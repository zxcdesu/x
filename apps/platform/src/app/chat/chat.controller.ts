import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  create() {
    return this.chatService.create();
  }

  findOne() {
    return this.chatService.findOne();
  }

  findAll() {
    return this.chatService.findAll();
  }

  update() {
    return this.chatService.update();
  }

  remove() {
    return this.chatService.remove();
  }
}
