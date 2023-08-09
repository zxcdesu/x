import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import joi from 'joi';
import { TokenService } from './token/token.service';
import { InviteController } from './invite/invite.controller';
import { InviteService } from './invite/invite.service';
import { PrismaService } from './prisma.service';
import { ProjectUserController } from './project-user/project-user.controller';
import { ProjectUserService } from './project-user/project-user.service';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

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
      imports: [ConfigModule],
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
        connectionInitOptions: {
          wait: false,
        },
      }),
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
    TokenService,
    InviteService,
    ProjectService,
    ProjectUserService,
    UserService,
  ],
})
export class AppModule {}
