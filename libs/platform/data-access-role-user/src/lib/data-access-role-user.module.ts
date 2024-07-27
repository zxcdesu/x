import { Module } from '@nestjs/common';
import { PrismaPlatformModule } from '@zxcdesu/prisma-platform';
import { RoleUserService } from './role-user.service';

@Module({
  imports: [PrismaPlatformModule],
  providers: [RoleUserService],
  exports: [RoleUserService],
})
export class DataAccessRoleUserModule {}
