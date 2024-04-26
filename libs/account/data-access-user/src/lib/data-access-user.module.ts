import { Module } from '@nestjs/common';
import { DataAccessInviteModule } from '@zxcdesu/data-access-invite';
import { PrismaAccountModule } from '@zxcdesu/prisma-account';
import { UserService } from './user.service';

@Module({
  imports: [PrismaAccountModule, DataAccessInviteModule],
  providers: [UserService],
  exports: [UserService],
})
export class DataAccessUserModule {}
