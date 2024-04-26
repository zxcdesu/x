import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  ContactDto,
  ContactService,
  CreateContactDto,
  UpdateContactDto,
} from '@zxcdesu/data-access-contact';
import { ProjectId } from '@zxcdesu/data-access-project';
import { ContactAssignedToService } from './contact-assigned-to.service';
import { CloseContactDto } from './dto/close-contact.dto';
import { EnqueueContactDto } from './dto/enqueue-contact.dto';

@Controller()
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly contactAssignedToService: ContactAssignedToService,
  ) {}

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'createContact',
  //   queue: 'createContact',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateContactDto,
  ) {
    return this.contactService.create(projectId, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'findOneContact',
  //   queue: 'findOneContact',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  findOne(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.contactService.findOne(projectId, id);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'findAllContacts',
  //   queue: 'findAllContacts',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  findAll(@ProjectId() projectId: number) {
    return this.contactService.findAll(projectId);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'updateContact',
  //   queue: 'updateContact',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateContactDto,
  ) {
    return this.contactService.update(projectId, id, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'removeContact',
  //   queue: 'removeContact',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  remove(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.contactService.remove(projectId, id);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'enqueueContact',
  //   queue: 'enqueueContact',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  enqueue(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: EnqueueContactDto,
  ) {
    return this.contactAssignedToService.enqueue(projectId, id, payload);
  }

  // @RmqService.rpc({
  //   exchange: 'platform',
  //   routingKey: 'closeContact',
  //   queue: 'closeContact',
  // })
  @SerializeOptions({
    type: ContactDto,
  })
  close(
    @ProjectId() projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: CloseContactDto,
  ) {
    return this.contactAssignedToService.close(projectId, id, payload);
  }
}
