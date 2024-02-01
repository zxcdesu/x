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
    routingKey: 'createContact',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  create(@RabbitPayload() payload: CreateContactDto) {
    return this.contactService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneContact',
    exchange: 'platform',
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
    routingKey: 'findAllContacts',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  findAll(@RabbitPayload() payload: FindAllContactsDto) {
    return this.contactService.findAll(payload);
  }

  @RabbitRPC({
    routingKey: 'updateContact',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  update(@RabbitPayload() payload: UpdateContactDto) {
    return this.contactService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeContact',
    exchange: 'platform',
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
    routingKey: 'assignContact',
    exchange: 'platform',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  assign(@RabbitPayload() payload: AssignContactDto) {
    return this.contactService.assign(payload);
  }

  @RabbitRPC({
    routingKey: 'resolveContact',
    exchange: 'platform',
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
    routingKey: 'rejectContact',
    exchange: 'platform',
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
