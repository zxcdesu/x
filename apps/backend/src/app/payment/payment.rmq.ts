import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentUrlDto } from './dto/payment-url.dto';

@Injectable()
export class PaymentRmq extends RmqService {
  create(projectId: number, payload: CreatePaymentDto) {
    return this.request<PaymentUrlDto>({
      exchange: 'billing',
      routingKey: 'createPayment',
      payload: {
        projectId,
        ...payload,
      },
    });
  }
}
