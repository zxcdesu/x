import { registerEnumType } from '@nestjs/graphql';
import { MailingStatus } from '@zxcdesu/prisma-mailing';

registerEnumType(MailingStatus, {
  name: 'MailingStatus',
});

export { MailingStatus };
