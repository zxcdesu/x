import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { ContactTagDto, CreateContactTagDto } from './dto';

@Injectable()
export class ContactTagRmq<
  T extends Partial<StringifyDate<ContactTagDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'createContactTag',
      queue: 'createContactTag',
    });
  }

  create(projectId: number, payload: CreateContactTagDto) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'createContactTag',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static remove() {
    return this.rpc({
      exchange: 'platform',
      routingKey: 'removeContactTag',
      queue: 'removeContactTag',
    });
  }

  remove(projectId: number, id: number) {
    return this.request<T>({
      exchange: 'platform',
      routingKey: 'removeContactTag',
      payload: {
        projectId,
        id,
      },
    });
  }
}
