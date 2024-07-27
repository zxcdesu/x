import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { RoleService } from './role.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [RoleService],
  exports: [RoleService],
})
export class DataAccessRoleModule {}
