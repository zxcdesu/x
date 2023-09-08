import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ERROR_FACTORY } from '@platform/nestjs-rabbitmq';
import joi from 'joi';
import { PlatformRmq } from './platform/platform.rmq';
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
    {
      provide: ERROR_FACTORY,
      useValue: (error: any) => error,
    },
    PlatformRmq,
  ],
})
export class AppModule {}
