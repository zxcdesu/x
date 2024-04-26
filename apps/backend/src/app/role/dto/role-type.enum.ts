import { registerEnumType } from '@nestjs/graphql';
import { RoleType } from '@zxcdesu/prisma-account';

registerEnumType(RoleType, {
  name: 'RoleType',
});

export { RoleType };
