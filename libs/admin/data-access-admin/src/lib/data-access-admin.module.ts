import { Module } from '@nestjs/common';
import { PrismaAdminModule } from '@zxcdesu/prisma-admin';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaAdminModule],
  providers: [AdminService],
  exports: [AdminService],
})
export class DataAccessAdminModule {}
