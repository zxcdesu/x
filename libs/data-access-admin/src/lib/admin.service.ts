import { Injectable } from '@nestjs/common';
import { PrismaService } from '@zxcdesu/prisma-admin';
import { CheckAdminDto } from './dto';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async check(payload: CheckAdminDto) {
    return Boolean(
      await this.prismaService.admin.findUnique({
        where: payload,
      }),
    );
  }
}
