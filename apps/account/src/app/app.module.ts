import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataAccessProjectModule } from '@zxcdesu/data-access-project';
import { DataAccessProjectUserModule } from '@zxcdesu/data-access-project-user';
import { DataAccessUserModule } from '@zxcdesu/data-access-user';
import { FeatureProjectUserInviteModule } from '@zxcdesu/feature-project-user-invite';
import joi from 'joi';
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
      }),
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.getOrThrow<string>('BROKER_URL'),
        exchanges: [
          {
            name: 'account',
            type: 'direct',
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
    FeatureProjectUserInviteModule,
  ],
  controllers: [
    InviteController,
    ProjectController,
    ProjectUserController,
    UserController,
  ],
})
export class AppModule {}
