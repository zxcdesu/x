import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @RabbitSubscribe({
    routingKey: 'createWorker',
    exchange: 'mailer',
  })
  create() {
    return this.workerService.create();
  }
}
