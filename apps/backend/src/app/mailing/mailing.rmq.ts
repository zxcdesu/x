import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { MailingDto } from './dto/mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Injectable()
export class MailingRmq extends RmqService {
  create(projectId: number, payload: CreateMailingDto) {
    return this.request<MailingDto>({
      exchange: 'mailer',
      routingKey: 'createMailing',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<MailingDto>({
      exchange: 'mailer',
      routingKey: 'findOneMailing',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<MailingDto[]>({
      exchange: 'mailer',
      routingKey: 'findAllMailings',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateMailingDto) {
    return this.request<MailingDto>({
      exchange: 'mailer',
      routingKey: 'updateMailing',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<MailingDto>({
      exchange: 'mailer',
      routingKey: 'removeMailing',
      payload: {
        projectId,
        id,
      },
    });
  }
}
