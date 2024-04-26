import { Module } from '@nestjs/common';
import { PrismaAccountModule } from '@zxcdesu/prisma-account';
import { InviteService } from './invite.service';

@Module({
  imports: [PrismaAccountModule],
  providers: [InviteService],
  exports: [InviteService],
})
export class DataAccessInviteModule {}
