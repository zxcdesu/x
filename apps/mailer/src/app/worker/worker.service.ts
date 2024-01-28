import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  create() {}
}
