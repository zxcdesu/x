import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async check(userId: number) {
    return Boolean(
      await this.prismaService.admin.findUnique({
        where: {
          userId,
        },
      }),
    );
  }
}
