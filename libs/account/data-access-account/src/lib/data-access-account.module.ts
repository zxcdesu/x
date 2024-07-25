import { Module } from '@nestjs/common';
import { PrismaAccountModule } from '@zxcdesu/prisma-account';
import { AccountService } from './account.service';

@Module({
  imports: [PrismaAccountModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class DataAccessAccountModule {}
