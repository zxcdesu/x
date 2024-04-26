import { registerEnumType } from '@nestjs/graphql';
import { ContactStatus } from '@zxcdesu/prisma-platform';

registerEnumType(ContactStatus, {
  name: 'ContactStatus',
});

export { ContactStatus };
