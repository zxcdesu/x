import { Prisma, WebhookType } from '@zxcdesu/prisma-integration';
import { IsEnum, IsUrl } from 'class-validator';

export class CreateWebhookDto
  implements Omit<Prisma.WebhookUncheckedCreateInput, 'projectId'>
{
  @IsUrl()
  url: string;

  @IsEnum(WebhookType)
  type: WebhookType;
}
