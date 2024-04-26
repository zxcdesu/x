import { Injectable } from '@nestjs/common';
import { PaymentProvider, PrismaService } from '@zxcdesu/prisma-billing';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';

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

  findOneOrDefaultByExternalId(provider: PaymentProvider, externalId: string) {
    return this.prismaService.payment.findUnique({
      where: {
        externalId_provider: {
          provider,
          externalId,
        },
      },
    });
  }

  update(projectId: number, id: number, payload: UpdatePaymentDto) {
    return this.prismaService.payment.update({
      where: {
        projectId,
        id,
      },
      data: payload,
    });
  }
}
