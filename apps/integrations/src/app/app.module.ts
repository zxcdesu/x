import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { HttpModule } from '@nestjs/axios';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import joi from 'joi';
import { IntegrationController } from './integration/integration.controller';
import { IntegrationService } from './integration/integration.service';
import { PrismaService } from './prisma.service';
import { WebhookSenderService } from './webhook/webhook-sender.service';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookService } from './webhook/webhook.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().uri().required(),
        BROKER_URL: joi.string().uri().required(),
      }),
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.getOrThrow<string>('BROKER_URL'),
        exchanges: [
          {
            name: 'integrations',
            type: 'topic',
          },
        ],
        prefetchCount: 1,
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; WebhookService/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
  ],
  controllers: [IntegrationController, WebhookController],
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
    IntegrationService,
    WebhookSenderService,
    WebhookService,
  ],
})
export class AppModule {}
