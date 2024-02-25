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
import joi from 'joi';
import { URL } from 'node:url';
import { InviteProjectUserService } from './invite/invite-project-user.service';
import { InviteController } from './invite/invite.controller';
import { InviteService } from './invite/invite.service';
import { PrismaService } from './prisma.service';
import { ProjectUserController } from './project-user/project-user.controller';
import { ProjectUserService } from './project-user/project-user.service';
import { ProjectAuthService } from './project/project-auth.service';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { UserAuthService } from './user/user-auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

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
  ],
  controllers: [
    InviteController,
    ProjectController,
    ProjectUserController,
    UserController,
  ],
  providers: [
    PrismaService,
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
    InviteProjectUserService,
    InviteService,
    ProjectAuthService,
    ProjectService,
    ProjectUserService,
    UserAuthService,
    UserService,
  ],
})
export class AppModule {}
