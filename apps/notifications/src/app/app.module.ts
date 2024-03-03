import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { NotificationSubscriberService } from '@zxcdesu/data-access-notification-subscriber';
import { NotificationSenderService } from '@zxcdesu/feature-notification-sender';
import { NotificationSubscriberRepository } from '@zxcdesu/feature-notification-subscriber-provider';
import joi from 'joi';
import { NotificationSenderController } from './notification-sender/notification-sender.contoller';
import { NotificationSubscriberController } from './notification-subscriber/notification-subscriber.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().uri().required(),
        BROKER_URL: joi.string().uri().required(),
        TELEGRAM_BOT_TOKEN: joi.string().required(),
      }),
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.getOrThrow<string>('BROKER_URL'),
        exchanges: [
          {
            name: 'notifications',
            type: 'topic',
          },
        ],
        prefetchCount: 1,
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    NotificationSubscriberService,
    NotificationSubscriberRepository,
    NotificationSenderService,
  ],
  controllers: [NotificationSenderController, NotificationSubscriberController],
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
