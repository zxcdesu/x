import { Module } from '@nestjs/common';
import { PrismaAuthModule } from '@zxcdesu/prisma-auth';
import { ProjectUserService } from './project-user.service';

@Module({
  imports: [PrismaAuthModule],
  providers: [ProjectUserService],
  exports: [ProjectUserService],
})
export class DataAccessProjectUserModule {}
