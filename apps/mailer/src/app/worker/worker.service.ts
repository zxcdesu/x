import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { MailingStatus, PrismaService } from '../prisma.service';
import { StartDto } from './dto/start.dto';
import { StopDto } from './dto/stop.dto';

@Injectable()
export class WorkerService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly prismaService: PrismaService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async start(payload: StartDto) {
    if (payload.status !== MailingStatus.Scheduled) {
      return;
    }

    // получить список пользователей, которых рассылка затронула
    // сгенерировать для каждого такого пользователя свой воркер

    const start = async () => {
      await this.prismaService.mailing.update({
        where: {
          id: payload.id,
        },
        data: {
          status: MailingStatus.Active,
        },
      });

      // TODO: создать для каждого воркера свое событие старта
    };

    if (payload.scheduledAt.getTime() > Date.now()) {
      const job = new CronJob(payload.scheduledAt, () => {
        start();
        this.schedulerRegistry.deleteCronJob(payload.id.toString());
      });

      this.schedulerRegistry.addCronJob(payload.id.toString(), job);
      job.start();
    } else {
      start();
    }
  }

  async stop(payload: StopDto) {
    this.schedulerRegistry.deleteCronJob(payload.id.toString());
    if (payload.status === MailingStatus.Active) {
      await this.prismaService.mailing.update({
        where: {
          id: payload.id,
        },
        data: {
          status: MailingStatus.Finished,
        },
      });

      // TODO: остановить воркеры
    }
  }
}
