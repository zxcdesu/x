import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { MailingDto } from './dto/mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Injectable()
export class MailingRmq extends RmqService {
  private readonly exchange = 'mailings';

  create(projectId: number, payload: CreateMailingDto) {
    return this.request<MailingDto>({
      exchange: this.exchange,
      routingKey: 'createMailing',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<MailingDto>({
      exchange: this.exchange,
      routingKey: 'findOneMailing',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, ids?: number[]) {
    return this.request<MailingDto[]>({
      exchange: this.exchange,
      routingKey: 'findAllMailings',
      payload: {
        projectId,
        ids,
      },
    });
  }

  update(projectId: number, payload: UpdateMailingDto) {
    return this.request<MailingDto>({
      exchange: this.exchange,
      routingKey: 'updateMailing',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<MailingDto>({
      exchange: this.exchange,
      routingKey: 'removeMailing',
      payload: {
        projectId,
        id,
      },
    });
  }
}
