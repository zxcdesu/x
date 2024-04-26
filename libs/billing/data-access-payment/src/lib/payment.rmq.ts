import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreatePaymentDto, HandlePaymentDto, PaymentUrlDto } from './dto';

@Injectable()
export class PaymentRmq<
  T extends Partial<StringifyDate<PaymentUrlDto>>,
> extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'createPayment',
      queue: 'createPayment',
    });
  }

  create(projectId: number, payload: CreatePaymentDto) {
    return this.request<T>({
      exchange: 'billing',
      routingKey: 'createPayment',
      payload: {
        projectId,
        ...payload,
      },
    });
  }

  static handle() {
    return this.subscribe({
      exchange: 'billing',
      routingKey: 'handlePayment',
      queue: 'createPayment',
    });
  }

  handle(payload: HandlePaymentDto) {
    return this.publish('billing', 'handlePayment', payload);
  }
}
