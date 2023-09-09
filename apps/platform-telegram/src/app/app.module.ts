import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { default as Joi, default as joi } from 'joi';
import { ChannelController } from './channel/channel.controller';
import { ChannelService } from './channel/channel.service';
import { EventController } from './event/event.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        BROKER_URL: joi.string().uri().required(),
        GATEWAY_URL: Joi.string().uri().required(),
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
            name: 'platform-telegram',
            type: 'topic',
          },
        ],
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    HttpModule.register({
      baseURL: 'https://api.telegram.org',
    }),
  ],
  controllers: [ChannelController, EventController],
  providers: [ChannelService],
})
export class AppModule {}
