import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-platform';

export * from '@prisma/client-platform';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // TODO: prisma-redis-middleware

  async onModuleInit() {
    await this.$connect();
  }
}
