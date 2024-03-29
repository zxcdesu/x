import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { TagService } from './tag.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [TagService],
  exports: [TagService],
})
export class DataAccessTagModule {}
