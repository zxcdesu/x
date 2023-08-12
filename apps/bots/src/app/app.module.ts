import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import joi from 'joi';
import { PrismaService } from './prisma.service';
import { BotTemplateController } from './bot-template/bot-template.controller';
import { BotTemplateService } from './bot-template/bot-template.service';
import { BotController } from './bot/bot.controller';
import { BotService } from './bot/bot.service';

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
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.get<string>('BROKER_URL'),
        exchanges: [
          {
            name: 'bots',
            type: 'topic',
          },
        ],
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
  ],
  controllers: [BotController, BotTemplateController],
  providers: [PrismaService, BotService, BotTemplateService],
})
export class AppModule {}
