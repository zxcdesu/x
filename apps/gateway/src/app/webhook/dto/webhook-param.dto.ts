import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class WebhookParamDto {
  @Transform(({ value }) => Number(value), {
    toClassOnly: true,
  })
  @IsInt()
  channelId: number;
}
