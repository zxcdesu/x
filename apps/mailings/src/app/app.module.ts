import { Module } from '@nestjs/common';
import { MailingController } from './mailing/mailing.controller';
import { MailingService } from './mailing/mailing.service';

@Module({
  imports: [],
  controllers: [MailingController],
  providers: [MailingService],
})
export class AppModule {}
