import { registerEnumType } from '@nestjs/graphql';
import { IntegrationType } from '@zxcdesu/prisma-integration';

registerEnumType(IntegrationType, {
  name: 'IntegrationType',
});

export { IntegrationType };
