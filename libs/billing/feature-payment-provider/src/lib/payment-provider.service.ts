import { Injectable } from '@nestjs/common';
import {
  CreatePaymentDto,
  HandlePaymentDto,
  PaymentService,
} from '@zxcdesu/data-access-payment';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentProviderService {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async create(projectId: number, payload: CreatePaymentDto) {
    return this.paymentRepository
      .get(payload.provider)
      .create(await this.paymentService.create(projectId, payload), payload);
  }

  handle(payload: HandlePaymentDto) {
    return this.paymentRepository.get(payload.provider).handleWebhook(payload);
  }
}
