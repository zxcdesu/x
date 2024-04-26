import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ContactDto } from '@zxcdesu/data-access-contact';
import {
  ContactTagService,
  CreateContactTagDto,
  RemoveContactTagDto,
} from '@zxcdesu/data-access-contact-tag';
import { ProjectId } from '@zxcdesu/data-access-project';

@Controller()
export class ContactTagController {
  constructor(private readonly contactTagService: ContactTagService) {}

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'createContactTag',
  //   queue: 'createContactTag',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateContactTagDto,
  ) {
    return this.contactTagService.create(projectId, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'removeContactTag',
  //   queue: 'removeContactTag',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: RemoveContactTagDto,
  ) {
    return this.contactTagService.remove(projectId, payload);
  }
}
