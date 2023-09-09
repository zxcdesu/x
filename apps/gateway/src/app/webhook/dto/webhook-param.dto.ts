import { IsString } from 'class-validator';

export class WebhookParam {
  @IsString()
  channelId: string;

  @IsString()
  platform: string;
}
