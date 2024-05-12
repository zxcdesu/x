import { Injectable } from '@nestjs/common';
import { PaymentProvider, PrismaService } from '@zxcdesu/prisma-billing';
import { CreatePaymentDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreatePaymentDto) {
    return this.prismaService.payment.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOneOrDefaultByExternalId(externalId: string, provider: PaymentProvider) {
    return this.prismaService.payment.findUnique({
      where: {
        externalId_provider: {
          externalId,
          provider,
        },
      },
    });
  }
}
