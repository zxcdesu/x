import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataAccessUserModule } from '@zxcdesu/data-access-user';
import { UserAuthService } from './user-auth.service';

@Module({
  imports: [JwtModule, DataAccessUserModule],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class FeatureUserAuthModule {}
