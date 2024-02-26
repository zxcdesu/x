import { IsDefined, IsEnum } from 'class-validator';
import { WebhookType } from '../../prisma.service';

export class SendWebhooksDto {
  @IsEnum(WebhookType)
  type: WebhookType;

  @IsDefined()
  value: unknown;
}
