import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class BotContainerService {
  async start() {
    throw new NotImplementedException();
  }

  async stop() {
    throw new NotImplementedException();
  }
}
