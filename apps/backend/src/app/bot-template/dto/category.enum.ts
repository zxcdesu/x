import { registerEnumType } from '@nestjs/graphql';
import { Category } from '@zxcdesu/prisma-bot';

registerEnumType(Category, {
  name: 'Category',
});

export { Category };
