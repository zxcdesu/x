import { All, Body, Controller, Param, Query } from '@nestjs/common';
import { PlatformRmq } from '../platform/platform.rmq';
import { WebhookParam } from './dto/webhook-param.dto';

@Controller(':platform')
export class WebhookController {
  constructor(private readonly platformRmq: PlatformRmq) {}

  @All(':channelId')
  webhook(
    @Param() param: WebhookParam,
    @Query() query: unknown,
    @Body() body: unknown,
  ) {
    return this.platformRmq.event(param.platform, {
      param,
      query,
      body,
    });
  }
}
