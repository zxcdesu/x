import { All, Body, Controller, Param, Query } from '@nestjs/common';
import { ChannelEventRmq } from '@platform/platform-type';
import { WebhookParamDto } from './dto/webhook-param.dto';

@Controller()
export class WebhookController {
  constructor(private readonly channelEventRmq: ChannelEventRmq) {}

  @All(':channelId')
  webhook(
    @Param() param: WebhookParamDto,
    @Query() query: unknown,
    @Body() body: unknown,
  ) {
    this.channelEventRmq
      .event({
        param,
        query,
        body,
      })
      .catch(console.error);
    return 'ok';
  }
}
