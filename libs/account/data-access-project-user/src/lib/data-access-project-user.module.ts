import { Module } from '@nestjs/common';
import { PrismaAccountModule } from '@zxcdesu/prisma-account';
import { ProjectUserService } from './project-user.service';

@Module({
  imports: [PrismaAccountModule],
  providers: [ProjectUserService],
  exports: [ProjectUserService],
})
export class DataAccessProjectUserModule {}
