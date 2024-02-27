import { Module } from '@nestjs/common';
import { PrismaAuthModule } from '@zxcdesu/prisma-auth';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaAuthModule],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class DataAccessProjectModule {}
