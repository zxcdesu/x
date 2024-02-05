import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-billing';
import { CreateWalletDto, UpdateWalletDto } from './dto';

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, payload: CreateWalletDto) {
    return this.prismaService.wallet.create({
      data: {
        projectId,
        ...payload,
      },
    });
  }

  findOne(projectId: number) {
    return this.prismaService.wallet.findUniqueOrThrow({
      where: {
        projectId,
      },
    });
  }

  update(projectId: number, payload: UpdateWalletDto) {
    return this.prismaService.wallet.update({
      where: {
        projectId,
      },
      data: payload,
    });
  }

  remove(projectId: number) {
    return this.prismaService.wallet.delete({
      where: {
        projectId,
      },
    });
  }
}
