import { Module } from '@nestjs/common';
import { DataAccessInviteModule } from '@zxcdesu/data-access-invite';
import { PrismaAuthModule } from '@zxcdesu/prisma-auth';
import { UserService } from './user.service';

@Module({
  imports: [PrismaAuthModule, DataAccessInviteModule],
  providers: [UserService],
  exports: [UserService],
})
export class DataAccessUserModule {}
