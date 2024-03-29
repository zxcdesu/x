import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { ContactFieldService } from './custom-field.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [ContactFieldService],
  exports: [ContactFieldService],
})
export class DataAccessContactFieldModule {}
