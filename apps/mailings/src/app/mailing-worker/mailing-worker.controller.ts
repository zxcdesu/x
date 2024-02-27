import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, NotImplementedException } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class MailingWorkerController {
  @RmqService.subscribe({
    exchange: 'mailings.jobs',
    routingKey: 'startMailingJobWorker',
    queue: 'startMailingJobWorker',
  })
  start(@RabbitPayload() payload: unknown): Promise<void> {
    throw new NotImplementedException({
      payload,
    });
  }

  @RmqService.subscribe({
    exchange: 'mailings.jobs',
    routingKey: 'stopMailingJobWorker',
    queueOptions: {
      autoDelete: true,
    },
  })
  stop(@RabbitPayload() payload: unknown): Promise<void> {
    throw new NotImplementedException({
      payload,
    });
  }
}
