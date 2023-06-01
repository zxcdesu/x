import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  create() {
    return this.messageService.create();
  }

  findOne() {
    return this.messageService.create();
  }

  findAll() {
    return this.messageService.create();
  }

  update() {
    return this.messageService.create();
  }

  remove() {
    return this.messageService.create();
  }
}
