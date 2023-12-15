import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class WorkerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(payload: any) {
    await this.amqpConnection.createSubscriber(this.create.bind(this), {}, '');
  }

  private async work(payload: any) {
    const worker = await this.prismaService.mailingWorker.findUniqueOrThrow({
      where: {
        id: payload.id,
      },
    });
  }
}
