import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataAccessProjectUserModule } from '@zxcdesu/data-access-project-user';
import { ProjectAuthService } from './project-auth.service';

@Module({
  imports: [JwtModule, DataAccessProjectUserModule],
  providers: [ProjectAuthService],
  exports: [ProjectAuthService],
})
export class FeatureProjectAuthModule {}
