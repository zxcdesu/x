import { Exclude } from 'class-transformer';
import { Webhook, WebhookEventType } from '../../prisma.service';

export class WebhookDto implements Webhook {
  id: number;

  @Exclude()
  projectId: number;

  eventType: WebhookEventType;

  url: string;
}
