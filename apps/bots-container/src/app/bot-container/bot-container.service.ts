import { Injectable, NotImplementedException } from '@nestjs/common';
import { StartBotContainer } from './dto/start-bot-container.dto';
import { StopBotContainer } from './dto/stop-bot-container.dto';

@Injectable()
export class BotContainerService {
  async start(payload: StartBotContainer) {
    throw new NotImplementedException();
  }

  async stop(payload: StopBotContainer) {
    throw new NotImplementedException();
  }
}
