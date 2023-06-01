import { Controller } from '@nestjs/common';
import { BotContainerService } from './bot-container.service';

@Controller()
export class BotContainerController {
  constructor(private readonly botContainerService: BotContainerService) {}

  start() {
    return this.botContainerService.start();
  }

  stop() {
    return this.botContainerService.stop();
  }
}
