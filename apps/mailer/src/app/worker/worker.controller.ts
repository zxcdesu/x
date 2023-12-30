import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @RabbitSubscribe({
    queue: 'mailer.worker',
    routingKey: 'create',
    exchange: 'mailer.worker',
  })
  create(@RabbitPayload() payload: any) {
    return this.workerService.create(payload);
  }
}
