import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { HsmService } from './hsm.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [HsmService],
  exports: [HsmService],
})
export class DataAccessHsmModule {}
