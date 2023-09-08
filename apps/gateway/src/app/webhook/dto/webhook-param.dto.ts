import { IsString } from 'class-validator';

export class WebhookParam {
  @IsString()
  id: string;

  @IsString()
  platform: string;
}
