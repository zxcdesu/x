import { Module } from '@nestjs/common';
import { BotTemplateController } from './bot-template/bot-template.controller';
import { BotTemplateService } from './bot-template/bot-template.service';
import { BotController } from './bot/bot.controller';
import { BotService } from './bot/bot.service';

@Module({
  imports: [],
  controllers: [BotController, BotTemplateController],
  providers: [BotService, BotTemplateService],
})
export class AppModule {}
