import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { FieldService } from './field.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [FieldService],
  exports: [FieldService],
})
export class DataAccessFieldModule {}
