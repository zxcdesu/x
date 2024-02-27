import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateMailingDto,
  MailingDto,
  MailingService,
  UpdateMailingDto,
} from '@zxcdesu/data-access-mailing';
import { MailingSchedulerService } from '@zxcdesu/feature-mailing-scheduler';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class MailingController {
  constructor(
    private readonly mailingService: MailingService,
    private readonly mailingSchedulerService: MailingSchedulerService,
  ) {}

  @RmqService.rpc({
    exchange: 'mailings',
    routingKey: 'createMailing',
    queue: 'createMailing',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  async create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateMailingDto,
  ): Promise<MailingDto> {
    return this.mailingSchedulerService.start(
      await this.mailingService.create(projectId, payload),
    );
  }

  @RmqService.rpc({
    exchange: 'mailings',
    routingKey: 'findOneMailing',
    queue: 'findOneMailing',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<MailingDto> {
    return this.mailingService.findOne(projectId, id);
  }

  @RmqService.rpc({
    exchange: 'mailings',
    routingKey: 'findAllMailings',
    queue: 'findAllMailings',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  findAll(@ProjectId() projectId: number): Promise<MailingDto[]> {
    return this.mailingService.findAll(projectId);
  }

  @RmqService.rpc({
    exchange: 'mailings',
    routingKey: 'updateMailing',
    queue: 'updateMailing',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  async update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateMailingDto,
  ): Promise<MailingDto> {
    return this.mailingSchedulerService.start(
      await this.mailingService.update(projectId, id, payload),
    );
  }

  @RmqService.rpc({
    exchange: 'mailings',
    routingKey: 'removeMailing',
    queue: 'removeMailing',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  async remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<MailingDto> {
    return this.mailingSchedulerService.stop(
      await this.mailingService.remove(projectId, id),
    );
  }
}
