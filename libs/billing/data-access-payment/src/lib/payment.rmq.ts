import { Injectable } from '@nestjs/common';
import { RmqFactory } from '@zxcdesu/util-rmq';
import { StringifyDate } from '@zxcdesu/util-types';
import { CreatePaymentDto, HandlePaymentDto, PaymentInPendingDto } from './dto';

@Injectable()
export class PaymentRmq extends RmqFactory {
  static create() {
    return this.rpc({
      exchange: 'billing',
      routingKey: 'createPayment',
      queue: 'createPayment',
    });
  }

  create<T extends Partial<StringifyDate<PaymentInPendingDto>>>(
    projectId: number,
    payload: CreatePaymentDto,
  ) {
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
