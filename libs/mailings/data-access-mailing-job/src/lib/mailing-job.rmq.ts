import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { MailingJobDto } from './dto';

@Injectable()
export class MailingJobRmq<
  T extends Partial<StringifyDate<MailingJobDto>>,
> extends RmqFactory {
  static findAll() {
    return this.rpc({
      exchange: 'mailings',
      routingKey: 'findAllMailingJobs',
      queue: 'findAllMailingJobs',
    });
  }

  findAll(projectId: number) {
    return this.request<T>({
      exchange: 'mailings',
      routingKey: 'findAllMailingJobs',
      payload: {
        projectId,
      },
    });
  }
}
