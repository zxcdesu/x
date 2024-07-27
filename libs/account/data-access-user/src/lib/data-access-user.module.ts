import { Module } from '@nestjs/common';
import { PrismaAccountModule } from '@zxcdesu/prisma-account';
import { UserService } from './user.service';

@Module({
  imports: [PrismaAccountModule],
  providers: [UserService],
  exports: [UserService],
})
export class DataAccessUserModule {}
