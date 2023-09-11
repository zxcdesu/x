import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChannelEventRmq } from '@platform/platform-type';
import joi from 'joi';
import { ErrorFactoryService } from './error-factory.service';
import { WebhookController } from './webhook/webhook.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        BROKER_URL: joi.string().uri().required(),
        PORT: joi.number().port().default(3000),
      }),
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('BROKER_URL'),
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
  ],
  controllers: [WebhookController],
  providers: [
    ErrorFactoryService,
    ChannelEventRmq.provide(ErrorFactoryService),
  ],
})
export class AppModule {}
