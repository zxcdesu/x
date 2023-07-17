import { Module } from '@nestjs/common';
import { PrismaService } from 'apps/bots/prisma/prisma.service';
import { BotTemplateController } from './bot-template/bot-template.controller';
import { BotTemplateService } from './bot-template/bot-template.service';
import { BotController } from './bot/bot.controller';
import { BotService } from './bot/bot.service';

@Module({
  imports: [],
  controllers: [BotController, BotTemplateController],
  providers: [PrismaService, BotService, BotTemplateService],
})
export class AppModule {}
