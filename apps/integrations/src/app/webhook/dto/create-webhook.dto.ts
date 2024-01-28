import { IsEnum, IsInt, IsUrl } from 'class-validator';
import { Prisma, WebhookType } from '../../prisma.service';

export class CreateWebhookDto implements Prisma.WebhookUncheckedCreateInput {
  @IsInt()
  projectId: number;

  @IsUrl()
  url: string;

  @IsEnum(WebhookType)
  type: WebhookType;
}
