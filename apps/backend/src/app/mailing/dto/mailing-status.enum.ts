import { registerEnumType } from '@nestjs/graphql';
import { MailingStatus } from '@zxcdesu/prisma-mailings';

registerEnumType(MailingStatus, {
  name: 'MailingStatus',
});

export { MailingStatus };
