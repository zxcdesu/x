import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import joi from 'joi';
import { IntegrationController } from './integration/integration.controller';
import { IntegrationService } from './integration/integration.service';
import { PrismaService } from './prisma.service';
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
        uri: configService.get<string>('BROKER_URL'),
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
  providers: [PrismaService, IntegrationService, WebhookService],
})
export class AppModule {}
