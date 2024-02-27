import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreatePaymentArgs } from './dto/create-payment.args';
import { PaymentUrlObject } from './dto/payment-url.object';

@Injectable()
export class PaymentRmq extends RmqService {
  create(projectId: number, payload: CreatePaymentArgs) {
    return this.request<PaymentUrlObject>({
      exchange: 'billing',
      routingKey: 'createPayment',
      payload: {
        projectId,
        ...payload,
      },
    });
  }
}
