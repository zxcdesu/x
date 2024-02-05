import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DataAccessInviteModule } from '@zxcdesu/data-access-invite';
import { DataAccessProjectModule } from '@zxcdesu/data-access-project';
import { DataAccessProjectUserModule } from '@zxcdesu/data-access-project-user';
import { DataAccessUserModule } from '@zxcdesu/data-access-user';
import { JwtModule } from '@zxcdesu/infrastructure';
import joi from 'joi';
import { InviteController } from './invite/invite.controller';
import { ProjectUserController } from './project-user/project-user.controller';
import { ProjectAuthService } from './project/project-auth.service';
import { ProjectController } from './project/project.controller';
import { UserAuthService } from './user/user-auth.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().uri().required(),
        BROKER_URL: joi.string().uri().required(),
        SECRET: joi.string().required(),
      }),
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.get<string>('BROKER_URL'),
        exchanges: [
          {
            name: 'auth',
            type: 'topic',
          },
        ],
        prefetchCount: 1,
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
      }),
    }),
    DataAccessInviteModule,
    DataAccessProjectModule,
    DataAccessProjectUserModule,
    DataAccessUserModule,
  ],
  controllers: [
    InviteController,
    ProjectController,
    ProjectUserController,
    UserController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
    ProjectAuthService,
    UserAuthService,
  ],
})
export class AppModule {}
