import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { ContactTagService } from './contact-tag.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [ContactTagService],
  exports: [ContactTagService],
})
export class DataAccessContactTagModule {}
