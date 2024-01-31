import { IsObject } from 'class-validator';

export class HandleWebhookDto<T = unknown> {
  @IsObject()
  value: T;
}
