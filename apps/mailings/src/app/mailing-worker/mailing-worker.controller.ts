import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { StartMailingWorkerDto } from './dto/start-mailing-worker.dto';
import { StopMailingWorkerDto } from './dto/stop-mailing-worker.dto';
import { MailingWorkerService } from './mailing-worker.service';

@Controller()
export class MailingWorkerController {
  constructor(private readonly mailingWorkerService: MailingWorkerService) {}

  @RmqService.subscribe({
    exchange: 'mailings.worker',
    routingKey: 'startMailingWorker',
    queue: 'startMailingWorker',
  })
  start(@RabbitPayload() payload: StartMailingWorkerDto): Promise<void> {
    return this.mailingWorkerService.start(payload);
  }

  @RmqService.subscribe({
    exchange: 'mailings.worker',
    routingKey: 'stopMailingWorker',
    queueOptions: {
      autoDelete: true,
    },
  })
  stop(@RabbitPayload() payload: StopMailingWorkerDto): Promise<void> {
    return this.mailingWorkerService.stop(payload);
  }
}
