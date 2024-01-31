import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandleWebhookDto } from './dto/handle-webhook.dto';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(payload: CreatePaymentDto) {
    const payment = await this.prismaService.payment.create({
      data: {
        projectId: payload.projectId,
        provider: payload.provider,
      },
    });

    const paymentDto = await this.paymentRepository
      .get(payment.provider)
      .create(payment, payload);

    await this.prismaService.payment.update({
      where: {
        id: payment.id,
      },
      data: paymentDto.update,
    });

    return paymentDto;
  }

  handleWebhook(payload: HandleWebhookDto) {
    return this.paymentRepository.get(payload.provider).handleWebhook(payload);
  }
}
