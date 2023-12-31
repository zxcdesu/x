import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/nestjs-rabbitmq';
import { ContactDto } from './dto/contact.dto';
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

  findAll(projectId: number, ids?: number[]) {
    return this.request<ContactDto[]>({
      exchange: 'platform',
      routingKey: 'findAllContacts',
      payload: {
        projectId,
        ids,
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
}
