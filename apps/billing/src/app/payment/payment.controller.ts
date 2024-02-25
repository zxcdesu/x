import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandlePaymentDto } from './dto/handle-payment.dto';
import { PaymentUrlDto } from './dto/payment-url.dto';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @RmqService.rpc({
    exchange: 'billing',
    routingKey: 'createPayment',
    queue: 'createPayment',
  })
  @SerializeOptions({
    type: PaymentUrlDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreatePaymentDto,
  ): Promise<PaymentUrlDto> {
    return this.paymentService.create(projectId, payload);
  }

  @RmqService.subscribe({
    exchange: 'billing',
    routingKey: 'handlePayment',
    queue: 'handlePayment',
  })
  handle(@RabbitPayload() payload: HandlePaymentDto): Promise<void> {
    return this.paymentService.handle(payload);
  }
}
