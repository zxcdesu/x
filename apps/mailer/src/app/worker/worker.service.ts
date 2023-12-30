import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  create(payload: unknown) {
    return this.amqpConnection.createSubscriber(
      this.work.bind(this),
      {
        exchange: 'mailer.worker',
        queue: 'mailer.worker.work',
        routingKey: 'work',
      },
      'work',
    );
  }

  private async work(payload: unknown) {
    const worker = await this.prismaService.mailingWorker.findUniqueOrThrow({
      where: {
        id: 1,
      },
    });
  }
}
