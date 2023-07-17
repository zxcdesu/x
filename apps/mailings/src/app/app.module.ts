import { Module } from '@nestjs/common';
import { PrismaService } from 'apps/mailings/prisma/prisma.service';
import { MailingController } from './mailing/mailing.controller';
import { MailingService } from './mailing/mailing.service';

@Module({
  imports: [],
  controllers: [MailingController],
  providers: [PrismaService, MailingService],
})
export class AppModule {}
