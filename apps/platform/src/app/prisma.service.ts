import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated';

export * from '../../prisma/generated';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // TODO: prisma-redis-middleware

  async onModuleInit() {
    await this.$connect();
  }
}
