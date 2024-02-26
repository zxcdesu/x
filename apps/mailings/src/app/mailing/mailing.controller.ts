import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { MailingDto } from './dto/mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import { MailingService } from './mailing.service';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @RmqService.rpc({
    exchange: 'mailings',
    routingKey: 'createMailing',
    queue: 'createMailing',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateMailingDto,
  ): Promise<MailingDto> {
    return this.mailingService.create(projectId, payload);
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
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateMailingDto,
  ): Promise<MailingDto> {
    return this.mailingService.update(projectId, id, payload);
  }

  @RmqService.rpc({
    exchange: 'mailings',
    routingKey: 'removeMailing',
    queue: 'removeMailing',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ): Promise<MailingDto> {
    return this.mailingService.remove(projectId, id);
  }
}
