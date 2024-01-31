import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/nestjs-rabbitmq';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentRmq extends RmqService {
  create(projectId: number, payload: CreatePaymentDto) {
    return this.request<PaymentDto>({
      exchange: 'billing',
      routingKey: 'createPayment',
      payload: {
        ...payload,
        projectId,
      },
    });
  }
}
