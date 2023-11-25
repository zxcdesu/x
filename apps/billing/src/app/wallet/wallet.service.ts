import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateWalletDto) {
    return this.prismaService.wallet.create({
      data: payload,
    });
  }

  findOne(projectId: number) {
    return this.prismaService.wallet.findUniqueOrThrow({
      where: {
        projectId,
      },
    });
  }

  update(payload: UpdateWalletDto) {
    return this.prismaService.wallet.update({
      where: {
        projectId: payload.projectId,
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
