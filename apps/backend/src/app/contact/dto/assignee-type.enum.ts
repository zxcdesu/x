import { registerEnumType } from '@nestjs/graphql';
import { AssigneeType } from '@zxcdesu/prisma-platform';

registerEnumType(AssigneeType, {
  name: 'AssigneeType',
});

export { AssigneeType };
