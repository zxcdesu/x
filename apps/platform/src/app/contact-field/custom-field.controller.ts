import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ContactDto } from '@zxcdesu/data-access-contact';
import {
  ContactFieldService,
  CreateContactFieldDto,
  RemoveContactFieldDto,
} from '@zxcdesu/data-access-contact-field';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class CustomFieldController {
  constructor(private readonly contactFieldService: ContactFieldService) {}

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'createContactField',
    queue: 'createContactField',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateContactFieldDto,
  ) {
    return this.contactFieldService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'removeContactField',
    queue: 'removeContactField',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: RemoveContactFieldDto,
  ) {
    return this.contactFieldService.remove(projectId, payload);
  }
}
