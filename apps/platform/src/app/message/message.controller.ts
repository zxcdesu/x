import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  create() {
    // return this.messageService.create();
  }

  findOne() {
    // return this.messageService.findOne();
  }

  findAll() {
    // return this.messageService.findAll();
  }

  update() {
    // return this.messageService.update();
  }

  remove() {
    // return this.messageService.remove();
  }
}
