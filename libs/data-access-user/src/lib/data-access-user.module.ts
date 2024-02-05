import { Module } from '@nestjs/common';
import { PrismaAuthModule } from '@zxcdesu/prisma-auth';
import { UserService } from './user.service';

@Module({
  imports: [PrismaAuthModule],
  providers: [UserService],
  exports: [UserService],
})
export class DataAccessUserModule {}
