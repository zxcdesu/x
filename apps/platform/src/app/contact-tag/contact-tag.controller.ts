import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ContactDto } from '../contact/dto/contact.dto';
import { ContactTagService } from './contact-tag.service';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { RemoveContactTagDto } from './dto/remove-contact-tag.dto';

@Controller()
export class ContactTagController {
  constructor(private readonly contactTagService: ContactTagService) {}

  @RabbitRPC({
    routingKey: 'createContactTag',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  create(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload() payload: CreateContactTagDto,
  ) {
    return this.contactTagService.create(projectId, payload);
  }

  @RabbitRPC({
    routingKey: 'removeContactTag',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload() payload: RemoveContactTagDto,
  ) {
    return this.contactTagService.remove(projectId, payload);
  }
}
