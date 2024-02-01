import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/nestjs-rabbitmq';
import { AssignContactDto } from './dto/assign-contact.dto';
import { ContactDto } from './dto/contact.dto';
import { CreateAssignedToDto } from './dto/create-assigned-to.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactRmq extends RmqService {
  create(projectId: number, payload: CreateContactDto) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'createContact',
      payload: {
        ...payload,
        projectId,
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
        ...payload,
        projectId,
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

  assign(projectId: number, payload: AssignContactDto) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'assignContact',
      payload: {
        ...payload,
        projectId,
      },
    });
  }

  resolve(projectId: number, id: number) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'assignContact',
      payload: {
        projectId,
        id,
      },
    });
  }

  reject(projectId: number, id: number) {
    return this.request<ContactDto>({
      exchange: 'platform',
      routingKey: 'assignContact',
      payload: {
        projectId,
        id,
      },
    });
  }
}
