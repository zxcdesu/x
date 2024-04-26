import { registerEnumType } from '@nestjs/graphql';
import { AttachmentType } from '@zxcdesu/prisma-platform';

registerEnumType(AttachmentType, {
  name: 'AttachmentType',
});

export { AttachmentType };
