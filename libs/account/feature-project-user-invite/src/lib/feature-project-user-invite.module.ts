import { Module } from '@nestjs/common';
import { DataAccessInviteModule } from '@zxcdesu/data-access-invite';
import { DataAccessProjectUserModule } from '@zxcdesu/data-access-project-user';
import { DataAccessUserModule } from '@zxcdesu/data-access-user';
import { ProjectUserInviteService } from './project-user-invite.service';

@Module({
  imports: [
    DataAccessInviteModule,
    DataAccessUserModule,
    DataAccessProjectUserModule,
  ],
  providers: [ProjectUserInviteService],
  exports: [ProjectUserInviteService],
})
export class FeatureProjectUserInviteModule {}
