import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { MessageService } from './message.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [MessageService],
  exports: [MessageService],
})
export class DataAccessMessageModule {}
