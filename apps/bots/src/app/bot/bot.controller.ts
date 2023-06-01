import { Controller } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller()
export class BotController {
  constructor(private readonly botService: BotService) {}

  create() {
    return this.botService.create();
  }

  findOne() {
    return this.botService.findOne();
  }

  findAll() {
    return this.botService.findAll();
  }

  update() {
    return this.botService.update();
  }

  remove() {
    return this.botService.remove();
  }
}
