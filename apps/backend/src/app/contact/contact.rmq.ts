import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CloseContactDto } from './dto/close-contact.dto';
import { ContactDto } from './dto/contact.dto';
import { CreateAssignedToDto } from './dto/create-assigned-to.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { EnqueueContactDto } from './dto/enqueue-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactRmq extends RmqService {
  create(projectId: number, payload: CreateContactDto) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'createContact',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'findOneContact',
      payload: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: number, assignedTo: CreateAssignedToDto) {
    return this.request<ContactDto[]>({
      exchange: 'platform',
      routingKey: 'findAllContacts',
      payload: {
        projectId,
        assignedTo,
      },
    });
  }

  update(projectId: number, payload: UpdateContactDto) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'updateContact',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  remove(projectId: number, id: number) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'removeContact',
      payload: {
        projectId,
        id,
      },
    });
  }

  enqueue(projectId: number, payload: EnqueueContactDto) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'enqueueContact',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  close(projectId: number, payload: CloseContactDto) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'closeContact',
      payload: {
        projectId,
        ...payload,
      },
    });
  }
}
