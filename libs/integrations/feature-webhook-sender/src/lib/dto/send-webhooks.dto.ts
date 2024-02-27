import { WebhookType } from '@zxcdesu/prisma-integrations';
import { IsDefined, IsEnum } from 'class-validator';

export class SendWebhooksDto {
  @IsEnum(WebhookType)
  type: WebhookType;

  @IsDefined()
  value: unknown;
}
