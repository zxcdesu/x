import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class WebhookParam {
  @Transform(({ value }) => Number(value), {
    toClassOnly: true,
  })
  @IsInt()
  channelId: number;
}
