import { registerEnumType } from '@nestjs/graphql';
import { ApprovalStatus } from '@zxcdesu/prisma-platform';

registerEnumType(ApprovalStatus, {
  name: 'ApprovalStatus',
});

export { ApprovalStatus };
