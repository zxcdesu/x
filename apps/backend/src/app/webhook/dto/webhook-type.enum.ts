import { registerEnumType } from '@nestjs/graphql';
import { WebhookType } from '@zxcdesu/prisma-integrations';

registerEnumType(WebhookType, {
  name: 'WebhookType',
});

export { WebhookType };
