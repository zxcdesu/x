import { PrismaService } from '../prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HandleWebhookDto } from './dto/handle-webhook.dto';
import { PaymentRepository } from './payment.repository';

export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(payload: CreatePaymentDto) {
    const payment = await this.prismaService.payment.create({
      data: payload,
    });

    const data = await this.paymentRepository
      .get(payment.provider)
      .create(payment, payload);

    await this.prismaService.payment.update({
      where: {
        id: payment.id,
      },
      data: data.update,
    });

    return data;
  }

  handleWebhook(payload: HandleWebhookDto) {
    return this.paymentRepository.get(payload.provider).handleWebhook(payload);
  }
}
