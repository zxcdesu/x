import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { StartDto } from './dto/start.dto';
import { StopDto } from './dto/stop.dto';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @RabbitSubscribe({
    exchange: 'mailer.worker',
    routingKey: 'start',
    queue: 'mailer.worker#start',
  })
  start(@RabbitPayload() payload: StartDto) {
    return this.workerService.start(payload);
  }

  @RabbitSubscribe({
    exchange: 'mailer.worker',
    routingKey: 'stop',
    queueOptions: {
      autoDelete: true,
    },
  })
  stop(@RabbitPayload() payload: StopDto) {
    return this.workerService.stop(payload);
  }
}
