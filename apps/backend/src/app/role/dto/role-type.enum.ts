import { registerEnumType } from '@nestjs/graphql';
import { RoleType } from '@zxcdesu/prisma-auth';

registerEnumType(RoleType, {
  name: 'RoleType',
});

export { RoleType };
