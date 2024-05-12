import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import {
  CreatePaymentDto,
  HandlePaymentDto,
  PaymentInPendingDto,
  PaymentRmq,
} from '@zxcdesu/data-access-payment';
import { ProjectId } from '@zxcdesu/data-access-project';
import { PaymentProviderService } from '@zxcdesu/feature-payment-provider';

@Controller()
export class PaymentController {
  constructor(
    private readonly paymentProviderService: PaymentProviderService,
  ) {}

  @PaymentRmq.create()
  @SerializeOptions({
    type: PaymentInPendingDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreatePaymentDto,
  ): Promise<PaymentInPendingDto> {
    return this.paymentProviderService.create(projectId, payload);
  }

  @PaymentRmq.handle()
  handle(@RabbitPayload() payload: HandlePaymentDto): Promise<void> {
    return this.paymentProviderService.handle(payload);
  }
}
