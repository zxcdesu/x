import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { BotContainerService } from './bot-container.service';
import { StartBotContainer } from './dto/start-bot-container.dto';
import { StopBotContainer } from './dto/stop-bot-container.dto';

@Controller()
export class BotContainerController {
  constructor(private readonly botContainerService: BotContainerService) {}

  start(@RabbitPayload() payload: StartBotContainer) {
    return this.botContainerService.start(payload);
  }

  stop(@RabbitPayload() payload: StopBotContainer) {
    return this.botContainerService.stop(payload);
  }
}
