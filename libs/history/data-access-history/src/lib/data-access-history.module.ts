import { Module } from '@nestjs/common';
import { PrismaHistoryModule } from '@zxcdesu/prisma-history';
import { HistoryService } from './history.service';

@Module({
  imports: [PrismaHistoryModule],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class DataAccessHistoryModule {}
