import { IsEnum, IsInt, IsUrl } from 'class-validator';
import { Prisma, WebhookEventType } from '../../prisma.service';

export class CreateWebhookDto implements Prisma.WebhookUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsEnum(WebhookEventType)
  eventType: WebhookEventType;

  @IsUrl()
  url: string;
}
