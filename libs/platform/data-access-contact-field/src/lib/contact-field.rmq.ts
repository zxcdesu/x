import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { ContactFieldDto, CreateContactFieldDto } from './dto';

@Injectable()
export class ContactFieldRmq<
  T extends Partial<StringifyDate<ContactFieldDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createContactField',
      queue: 'createContactField',
    });
  }

  create(projectId: number, payload: CreateContactFieldDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createContactField',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'removeContactField',
      queue: 'removeContactField',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeContactField',
      payload: {
        projectId,
        id,
      },
    });
  }
}
