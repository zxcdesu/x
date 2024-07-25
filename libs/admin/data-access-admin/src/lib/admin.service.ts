import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-admin';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(userId: number): Promise<boolean> {
    return Boolean(
      await this.prismaService.admin.findUnique({
        where: {
          userId,
        },
      }),
    );
  }
}
