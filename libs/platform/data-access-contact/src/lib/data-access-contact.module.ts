import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { ContactService } from './contact.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [ContactService],
  exports: [ContactService],
})
export class DataAccessContactModule {}
