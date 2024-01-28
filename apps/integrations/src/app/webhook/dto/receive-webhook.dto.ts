import { IsDefined, IsEnum, IsInt } from 'class-validator';
import { WebhookType } from '../../prisma.service';

export class ReceiveWebhookDto {
  @IsInt()
  projectId: number;

  @IsEnum(WebhookType)
  type: WebhookType;

  @IsDefined()
  value: unknown;
}
