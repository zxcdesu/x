import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailingSchedulerService } from './mailing-scheduler.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [MailingSchedulerService],
  exports: [MailingSchedulerService],
})
export class FeatureMailingSchedulerModule {}
