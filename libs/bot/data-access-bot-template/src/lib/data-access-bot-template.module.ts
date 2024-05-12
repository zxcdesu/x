import { Module } from '@nestjs/common';
import { PrismaBotsModule } from '@zxcdesu/prisma-bot';
import { BotTemplateService } from './bot-template.service';

@Module({
  imports: [PrismaBotsModule],
  providers: [BotTemplateService],
  exports: [BotTemplateService],
})
export class DataAccessBotTemplateModule {}
