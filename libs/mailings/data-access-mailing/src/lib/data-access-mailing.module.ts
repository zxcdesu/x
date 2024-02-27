import { Module } from '@nestjs/common';
import { PrismaMailingsModule } from '@zxcdesu/prisma-mailings';
import { MailingService } from './mailing.service';

@Module({
  imports: [PrismaMailingsModule],
  providers: [MailingService],
  exports: [MailingService],
})
export class DataAccessMailingModule {}
