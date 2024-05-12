import { Module } from '@nestjs/common';
import { PrismaMailingsModule } from '@zxcdesu/prisma-mailing';
import { MailingJobService } from './mailing-job.service';

@Module({
  imports: [PrismaMailingsModule],
  providers: [MailingJobService],
  exports: [MailingJobService],
})
export class DataAccessMailingJobModule {}
