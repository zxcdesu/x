import { Module } from '@nestjs/common';
import { PrismaBotsModule } from '@zxcdesu/prisma-bot';
import { BotService } from './bot.service';

@Module({
  imports: [PrismaBotsModule],
  providers: [BotService],
  exports: [BotService],
})
export class DataAccessBotModule {}
