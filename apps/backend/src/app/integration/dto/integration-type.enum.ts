import { registerEnumType } from '@nestjs/graphql';
import { IntegrationType } from '@zxcdesu/prisma-integrations';

registerEnumType(IntegrationType, {
  name: 'IntegrationType',
});

export { IntegrationType };
