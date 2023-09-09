import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateWalletDto) {
    return this.prismaService.wallet.create({
      data: payload,
    });
  }

  async findOne(projectId: number) {
    return this.prismaService.wallet.findUniqueOrThrow({
      where: {
        projectId,
      },
    });
  }

  async update(payload: UpdateWalletDto) {
    return this.prismaService.wallet.update({
      where: {
        projectId: payload.projectId,
      },
      data: payload,
    });
  }

  async remove(projectId: number) {
    return this.prismaService.wallet.delete({
      where: {
        projectId,
      },
    });
  }
}
