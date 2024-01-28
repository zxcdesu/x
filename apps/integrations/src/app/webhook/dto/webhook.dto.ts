import { Exclude } from 'class-transformer';
import { Webhook, WebhookType } from '../../prisma.service';

export class WebhookDto implements Webhook {
  id: number;

  @Exclude()
  projectId: number;

  url: string;

  type: WebhookType;
}
