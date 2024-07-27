import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class DataAccessProjectModule {}
