import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { ContactDto } from '../contact/dto/contact.dto';
import { ContactTagService } from './contact-tag.service';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { RemoveContactTagDto } from './dto/remove-contact-tag.dto';

@Controller()
export class ContactTagController {
  constructor(private readonly contactTagService: ContactTagService) {}

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'createContactTag',
    queue: 'createContactTag',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateContactTagDto,
  ) {
    return this.contactTagService.create(projectId, payload);
  }

  @RmqService.rpc({
    exchange: 'platform',
    routingKey: 'removeContactTag',
    queue: 'removeContactTag',
  })
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
