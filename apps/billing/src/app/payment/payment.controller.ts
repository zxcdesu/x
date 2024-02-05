import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import {
  CreatePaymentDto,
  HandleWebhookDto,
  PaymentDto,
  PaymentService,
} from '@zxcdesu/data-access-payment';
import { ProjectId } from '@zxcdesu/data-access-project';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';

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
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreatePaymentDto,
  ) {
    return this.paymentService.create(projectId, payload);
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
