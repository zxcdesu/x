import { Injectable, NotImplementedException } from '@nestjs/common';
import { StartMailingWorkerDto } from './dto/start-mailing-worker.dto';
import { StopMailingWorkerDto } from './dto/stop-mailing-worker.dto';

@Injectable()
export class MailingWorkerService {
  async start(payload: StartMailingWorkerDto) {
    throw new NotImplementedException({
      payload,
    });
  }

  async stop(payload: StopMailingWorkerDto) {
    throw new NotImplementedException({
      payload,
    });
  }
}
