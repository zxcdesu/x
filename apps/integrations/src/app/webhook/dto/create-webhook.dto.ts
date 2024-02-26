import { IsEnum, IsUrl } from 'class-validator';
import { Prisma, WebhookType } from '../../prisma.service';

export class CreateWebhookDto
  implements Omit<Prisma.WebhookUncheckedCreateInput, 'projectId'>
{
  @IsUrl()
  url: string;

  @IsEnum(WebhookType)
  type: WebhookType;
}
