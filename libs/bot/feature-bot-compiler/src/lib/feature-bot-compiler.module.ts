import { Module } from '@nestjs/common';
import { BotCompilerService } from './bot-compiler.service';

@Module({
  providers: [BotCompilerService],
  exports: [BotCompilerService],
})
export class FeatureBotCompilerModule {}
