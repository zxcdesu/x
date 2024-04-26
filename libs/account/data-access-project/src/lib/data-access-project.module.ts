import { Module } from '@nestjs/common';
import { PrismaAccountModule } from '@zxcdesu/prisma-account';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaAccountModule],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class DataAccessProjectModule {}
