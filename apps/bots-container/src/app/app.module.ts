import { Module } from '@nestjs/common';
import { BotContainerController } from './bot-container/bot-container.controller';
import { BotContainerService } from './bot-container/bot-container.service';

@Module({
  imports: [],
  controllers: [BotContainerController],
  providers: [BotContainerService],
})
export class AppModule {}
