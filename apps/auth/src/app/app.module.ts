import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { DataAccessProjectModule } from '@zxcdesu/data-access-project';
import { DataAccessProjectUserModule } from '@zxcdesu/data-access-project-user';
import { DataAccessUserModule } from '@zxcdesu/data-access-user';
import { FeatureInviteUserToProjectModule } from '@zxcdesu/feature-invite-user-to-project';
import { FeatureProjectAuthModule } from '@zxcdesu/feature-project-auth';
import { FeatureUserAuthModule } from '@zxcdesu/feature-user-auth';
import joi from 'joi';
import { URL } from 'node:url';
import { InviteController } from './invite/invite.controller';
import { ProjectUserController } from './project-user/project-user.controller';
import { ProjectController } from './project/project.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().uri().required(),
        BROKER_URL: joi.string().uri().required(),
        MAILER_TRANSPORT: joi.string().required(),
        SECRET: joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('SECRET'),
      }),
      inject: [ConfigService],
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.getOrThrow<string>('BROKER_URL'),
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
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const transport = configService.getOrThrow<string>('MAILER_TRANSPORT');
        const { host, username } = new URL(transport);
        return {
          transport,
          defaults: {
            from: `"${host}" <${username}>`,
          },
        };
      },
      inject: [ConfigService],
    }),
    DataAccessProjectModule,
    DataAccessProjectUserModule,
    DataAccessUserModule,
    FeatureInviteUserToProjectModule,
    FeatureProjectAuthModule,
    FeatureUserAuthModule,
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
  ],
})
export class AppModule {}
