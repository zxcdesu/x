import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { CreatePaymentDto } from '@zxcdesu/data-access-payment';
import {
  HandlePaymentDto,
  PaymentProviderService,
  PaymentUrlDto,
} from '@zxcdesu/feature-payment-provider';
import { ProjectId } from '@zxcdesu/util-project';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class PaymentController {
  constructor(
    private readonly paymentProviderService: PaymentProviderService,
  ) {}

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
    return this.paymentProviderService.create(projectId, payload);
  }

  @RmqService.subscribe({
    exchange: 'billing',
    routingKey: 'handlePayment',
    queue: 'handlePayment',
  })
  handle(@RabbitPayload() payload: HandlePaymentDto): Promise<void> {
    return this.paymentProviderService.handle(payload);
  }
}
