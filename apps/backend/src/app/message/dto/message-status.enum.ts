import { registerEnumType } from '@nestjs/graphql';
import { MessageStatus } from '@zxcdesu/prisma-platform';

registerEnumType(MessageStatus, {
  name: 'MessageStatus',
});

export { MessageStatus };
