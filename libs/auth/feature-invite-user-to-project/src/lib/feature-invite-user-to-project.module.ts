import { Module } from '@nestjs/common';
import { DataAccessInviteModule } from '@zxcdesu/data-access-invite';
import { DataAccessProjectUserModule } from '@zxcdesu/data-access-project-user';
import { DataAccessUserModule } from '@zxcdesu/data-access-user';
import { InviteUserToProjectService } from './invite-user-to-project.service';

@Module({
  imports: [
    DataAccessInviteModule,
    DataAccessUserModule,
    DataAccessProjectUserModule,
  ],
  providers: [InviteUserToProjectService],
  exports: [InviteUserToProjectService],
})
export class FeatureInviteUserToProjectModule {}
