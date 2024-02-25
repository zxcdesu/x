import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandlePaymentDto } from './dto/handle-payment.dto';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(projectId: number, payload: CreatePaymentDto) {
    return this.paymentRepository.get(payload.provider).create(
      await this.prismaService.payment.create({
        data: {
          projectId,
          ...payload,
        },
      }),
      payload,
    );
  }

  handleWebhook(payload: HandlePaymentDto) {
    return this.paymentRepository.get(payload.provider).handleWebhook(payload);
  }
}
