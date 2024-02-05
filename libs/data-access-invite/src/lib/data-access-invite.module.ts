import { Module } from '@nestjs/common';
import { PrismaAuthModule } from '@zxcdesu/prisma-auth';
import { InviteService } from './invite.service';

@Module({
  imports: [PrismaAuthModule],
  providers: [InviteService],
  exports: [InviteService],
})
export class DataAccessInviteModule {}
