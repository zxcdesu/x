import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { BotContainerService } from './bot-container.service';
import { StartBotContainerDto } from './dto/start-bot-container.dto';
import { StopBotContainerDto } from './dto/stop-bot-container.dto';

@Controller()
export class BotContainerController {
  constructor(private readonly botContainerService: BotContainerService) {}

  @RmqService.subscribe({
    exchange: 'bot-container',
    routingKey: 'startBotContainer',
    queue: 'startBotContainer',
  })
  start(@RabbitPayload() payload: StartBotContainerDto): Promise<void> {
    return this.botContainerService.start(payload);
  }

  @RmqService.subscribe({
    exchange: 'bot-container',
    routingKey: 'startBotContainer',
    queueOptions: {
      autoDelete: true,
    },
  })
  stop(@RabbitPayload() payload: StopBotContainerDto): Promise<void> {
    return this.botContainerService.stop(payload);
  }
}
