import { Webhook, WebhookType } from '@zxcdesu/prisma-integration';
import { Exclude } from 'class-transformer';

export class WebhookDto implements Webhook {
  id: number;

  @Exclude()
  projectId: number;

  url: string;

  type: WebhookType;
}
