import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-billing';
import { CreatePaymentDto, HandleWebhookDto } from './dto';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(projectId: number, payload: CreatePaymentDto) {
    const payment = await this.prismaService.payment.create({
      data: {
        projectId,
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
