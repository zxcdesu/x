import { registerEnumType } from '@nestjs/graphql';
import { WebhookType } from '@zxcdesu/prisma-integration';

registerEnumType(WebhookType, {
  name: 'WebhookType',
});

export { WebhookType };
