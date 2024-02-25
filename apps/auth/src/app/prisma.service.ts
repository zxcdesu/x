import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated';

export {
  Invite,
  Prisma,
  Project,
  ProjectUser,
  RoleType,
  User,
} from '../../prisma/generated';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
