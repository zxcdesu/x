import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { ChatService } from './chat.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [ChatService],
  exports: [ChatService],
})
export class DataAccessChatModule {}
