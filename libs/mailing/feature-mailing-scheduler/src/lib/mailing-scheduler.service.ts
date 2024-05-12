import { Injectable } from '@nestjs/common';
import { MailingDto } from '@zxcdesu/data-access-mailing';

@Injectable()
export class MailingSchedulerService {
  async start(mailing: MailingDto) {
    // TODO: start
    return mailing;
  }

  async stop(mailing: MailingDto) {
    // TODO: stop
    return mailing;
  }
}
