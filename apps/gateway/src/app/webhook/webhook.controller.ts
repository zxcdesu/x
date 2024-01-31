import {
  All,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { IpDecorator } from '../safety/ip.decorator';
import { YookassaService } from '../safety/yookassa.service';
import { WebhookParamDto } from './dto/webhook-param.dto';
import { WebhookService } from './webhook.service';

@Controller()
export class WebhookController {
  constructor(
    private readonly yookassaService: YookassaService,
    private readonly webhookService: WebhookService,
  ) {}

  @Post('yookassa')
  @HttpCode(200)
  handleYookassaWebhook(@IpDecorator() ip: string, @Body() body: unknown) {
    if (this.yookassaService.check(ip)) {
      return this.webhookService.handle(
        'billing',
        {
          provider: 'Yookassa',
          value: body,
        },
        'handleWebhook',
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
      'handleWebhook',
    );
  }

  @All(':channelId')
  @HttpCode(200)
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
