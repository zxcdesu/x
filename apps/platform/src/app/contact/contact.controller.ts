import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AssignContactDto } from './dto/assign-contact.dto';
import { ContactDto } from './dto/contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { FindAllContactsDto } from './dto/find-all-contacts.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'createContact',
    queue: 'platform.createContact',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  create(@RabbitPayload() payload: CreateContactDto) {
    return this.contactService.create(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'findOneContact',
    queue: 'platform.findOneContact',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.contactService.findOne(projectId, id);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'findAllContacts',
    queue: 'platform.findAllContacts',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  findAll(@RabbitPayload() payload: FindAllContactsDto) {
    return this.contactService.findAll(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'updateContact',
    queue: 'platform.updateContact',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  update(@RabbitPayload() payload: UpdateContactDto) {
    return this.contactService.update(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'removeContact',
    queue: 'platform.removeContact',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.contactService.remove(projectId, id);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'assignContact',
    queue: 'platform.assignContact',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  assign(@RabbitPayload() payload: AssignContactDto) {
    return this.contactService.assign(payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'resolveContact',
    queue: 'platform.resolveContact',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  resolve(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.contactService.resolve(projectId, id);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'rejectContact',
    queue: 'platform.rejectContact',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  reject(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.contactService.reject(projectId, id);
  }
}
