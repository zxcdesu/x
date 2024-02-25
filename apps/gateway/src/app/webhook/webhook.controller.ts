import {
  All,
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Ip } from '@zxcdesu/util-http';
import { WebhookService } from './webhook.service';
import { YookassaSafetyService } from './yookassa-safety.service';

@Controller()
export class WebhookController {
  constructor(
    private readonly yookassaSafetyService: YookassaSafetyService,
    private readonly webhookService: WebhookService,
  ) {}

  @Post('yookassa')
  @HttpCode(200)
  handleYookassaWebhook(@Ip() ip: string, @Body() body: unknown) {
    if (this.yookassaSafetyService.check(ip)) {
      return this.webhookService.handle(
        'billing',
        {
          provider: 'Yookassa',
          value: body,
        },
        'handlePayment',
      );
    }
  }

  @Post('telegram')
  @HttpCode(200)
  handleTelegramWebhook(@Body() body: unknown) {
    return this.webhookService.handle(
      'notifications',
      {
        provider: 'Telegram',
        value: body,
      },
      'handleSubscriber',
    );
  }

  @All(':channelId')
  @HttpCode(200)
  handleChannelWebhook(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Body() body: unknown,
  ) {
    return this.webhookService.handle(
      'platform',
      {
        channelId,
        value: body,
      },
      'handleChannel',
    );
  }
}
