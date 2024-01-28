import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChannelEventRmq } from '@zxcdesu/platform-type';
import joi from 'joi';
import { ChannelController } from './channel/channel.controller';
import { ChannelRepository } from './channel/channel.repository';
import { ChannelService } from './channel/channel.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { ErrorFactoryService } from './error-factory.service';
import { HsmController } from './hsm/hsm.controller';
import { HsmService } from './hsm/hsm.service';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { PrismaService } from './prisma.service';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().uri().required(),
        BROKER_URL: joi.string().uri().required(),
        GATEWAY_URL: joi.string().uri().required(),
      }),
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
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
        prefetchCount: 1,
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    HttpModule.register({}),
  ],
  controllers: [
    ChannelController,
    ChatController,
    ContactController,
    HsmController,
    MessageController,
    TagController,
  ],
  providers: [
    PrismaService,
    ChannelRepository,
    ChannelService,
    ChatService,
    ContactService,
    HsmService,
    MessageService,
    TagService,
    ErrorFactoryService,
    ChannelEventRmq.provide(ErrorFactoryService),
  ],
})
export class AppModule {}
