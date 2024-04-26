import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { ContactDto, CreateContactDto, UpdateContactDto } from './dto';

@Injectable()
export class ContactRmq<
  T extends Partial<StringifyDate<ContactDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createContact',
      queue: 'createContact',
    });
  }

  create(projectId: number, payload: CreateContactDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createContact',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static findOne() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneContact',
      queue: 'findOneContact',
    });
  }

  findOne(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneContact',
      payload: {
        projectId,
        id,
      },
    });
  }

  static findAll() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findAllContacts',
      queue: 'findAllContacts',
    });
  }

  findAll(projectId: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findAllContacts',
      payload: {
        projectId,
      },
    });
  }

  static update() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'findOneContact',
      queue: 'findOneContact',
    });
  }

  update(projectId: number, id: number, payload: UpdateContactDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'findOneContact',
      payload: {
        projectId,
        id,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'removeContact',
      queue: 'removeContact',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeContact',
      payload: {
        projectId,
        id,
      },
    });
  }
}
