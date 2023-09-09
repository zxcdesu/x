import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import joi from 'joi';
import { ChannelController } from './channel/channel.controller';
import { ChannelRmq } from './channel/channel.rmq';
import { ChannelService } from './channel/channel.service';
import { ChatController } from './chat/chat.controller';
import { ChatRmq } from './chat/chat.rmq';
import { ChatService } from './chat/chat.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { ErrorFactoryService } from './error-factory.service';
import { MessageController } from './message/message.controller';
import { MessageRmq } from './message/message.rmq';
import { MessageService } from './message/message.service';
import { PrismaService } from './prisma.service';

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
            name: 'platform',
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
    ChannelController,
    ChatController,
    ContactController,
    MessageController,
  ],
  providers: [
    PrismaService,
    ChannelService,
    ChatService,
    ContactService,
    MessageService,
    ErrorFactoryService,
    ChannelRmq.provide(ErrorFactoryService),
    ChatRmq.provide(ErrorFactoryService),
    MessageRmq.provide(ErrorFactoryService),
  ],
})
export class AppModule {}
