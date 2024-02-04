import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { MailingDto } from './dto/mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import { MailingService } from './mailing.service';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @RabbitRPC({
    exchange: 'mailer',
    routingKey: 'createMailing',
    queue: 'createMailing',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  create(@RabbitPayload() payload: CreateMailingDto) {
    return this.mailingService.create(payload);
  }

  @RabbitRPC({
    exchange: 'mailer',
    routingKey: 'findOneMailing',
    queue: 'findOneMailing',
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
    exchange: 'mailer',
    routingKey: 'findAllMailings',
    queue: 'findAllMailings',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  findAll(@RabbitPayload('projectId', ParseIntPipe) projectId: number) {
    return this.mailingService.findAll(projectId);
  }

  @RabbitRPC({
    exchange: 'mailer',
    routingKey: 'updateMailing',
    queue: 'updateMailing',
  })
  @SerializeOptions({
    type: MailingDto,
  })
  update(@RabbitPayload() payload: UpdateMailingDto) {
    return this.mailingService.update(payload);
  }

  @RabbitRPC({
    exchange: 'mailer',
    routingKey: 'removeMailing',
    queue: 'removeMailing',
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
