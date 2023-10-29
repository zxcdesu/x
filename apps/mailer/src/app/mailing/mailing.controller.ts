import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { MailingDto } from './dto/mailing.dto';
import { MailingService } from './mailing.service';
import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @RabbitRPC({
    routingKey: 'createMailing',
    exchange: 'mailer',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  create(@RabbitPayload() payload: CreateMailingDto) {
    return this.mailingService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneMailing',
    exchange: 'mailer',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.mailingService.findOne(projectId, id);
  }

  @RabbitRPC({
    routingKey: 'findAllMailings',
    exchange: 'mailer',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.mailingService.findAll(projectId);
  }

  @RabbitRPC({
    routingKey: 'updateMailing',
    exchange: 'mailer',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  update(@RabbitPayload() payload: UpdateMailingDto) {
    return this.mailingService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeMailing',
    exchange: 'mailer',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.mailingService.remove(projectId, id);
  }
}
