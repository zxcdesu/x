import { MailingJob, MailingJobStatus } from '@zxcdesu/prisma-mailings';
import { Exclude } from 'class-transformer';

export class MailingJobDto implements Omit<MailingJob, 'variables'> {
  id: number;

  @Exclude()
  mailingId: number;

  contactId: number;

  chatId: number;

  messageId: number | null;

  variables: Record<string, unknown>;

  status: MailingJobStatus;

  failedReason: string | null;
}
