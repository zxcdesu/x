import { registerEnumType } from '@nestjs/graphql';
import { Category } from '@zxcdesu/prisma-bots';

registerEnumType(Category, {
  name: 'Category',
});

export { Category };
