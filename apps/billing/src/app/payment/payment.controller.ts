import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandleWebhookDto } from './dto/handle-webhook.dto';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @RabbitRPC({
    exchange: 'billing',
    routingKey: 'createPayment',
    queue: 'billing.createPayment',
  })
  @SerializeOptions({
    type: PaymentDto,
  })
  create(@RabbitPayload() payload: CreatePaymentDto) {
    return this.paymentService.create(payload);
  }

  @RabbitSubscribe({
    exchange: 'billing',
    routingKey: 'handleWebhook',
    queue: 'billing.handleWebhook',
  })
  handleWebhook(@RabbitPayload() payload: HandleWebhookDto) {
    return this.paymentService.handleWebhook(payload);
  }
}
