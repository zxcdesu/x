import { All, Body, Controller, Param, Post, Query } from '@nestjs/common';
import { WebhookParamDto } from './dto/webhook-param.dto';
import { WebhookService } from './webhook.service';

@Controller()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('yookassa')
  handleYookassaWebhook(@Body() body: unknown) {
    return this.webhookService.handle(
      'billing',
      {
        provider: 'Yookassa',
        value: body,
      },
      'handleWebhook',
    );
  }

  @Post('telegram')
  handleTelegramWebhook(@Body() body: unknown) {
    return this.webhookService.handle(
      'notifications',
      {
        provider: 'Telegram',
        value: body,
      },
      'handleWebhook',
    );
  }

  @All(':channelId')
  handleWebhook(
    @Param() param: WebhookParamDto,
    @Query() query: unknown,
    @Body() body: unknown,
  ) {
    return this.webhookService.handle('platform', {
      param,
      query,
      body,
    });
  }
}
