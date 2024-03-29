import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { ChannelService } from './channel.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class DataAccessChannelModule {}
