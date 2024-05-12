import { Injectable, NotImplementedException } from '@nestjs/common';
import { StartBotContainerDto } from './dto/start-bot-container.dto';
import { StopBotContainerDto } from './dto/stop-bot-container.dto';

@Injectable()
export class BotContainerService {
  async start(payload: StartBotContainerDto) {
    throw new NotImplementedException({
      payload,
    });
  }

  async stop(payload: StopBotContainerDto) {
    throw new NotImplementedException({
      payload,
    });
  }
}
