import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';

@Injectable()
export class ContactRmq extends RmqService {
  private readonly exchange = 'platform';

  create(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'createContact',
      payload,
    });
  }

  findOne(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'findOneContact',
      payload,
    });
  }

  findAll(payload?: number[]) {
    return this.request<any[]>({
      exchange: this.exchange,
      routingKey: 'findAllContacts',
      payload,
    });
  }

  update(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'updateContact',
      payload,
    });
  }

  remove(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'removeContact',
      payload,
    });
  }
}
