import { registerEnumType } from '@nestjs/graphql';
import { AuthorType } from '@zxcdesu/prisma-platform';

registerEnumType(AuthorType, {
  name: 'AuthorType',
});

export { AuthorType };
