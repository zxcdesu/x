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
import { ChannelController } from './channel/channel.controller';
import { ChannelRepository } from './channel/channel.repository';
import { ChannelService } from './channel/channel.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { CustomFieldController } from './contact-field/custom-field.controller';
import { ContactFieldService } from './contact-field/custom-field.service';
import { ContactTagController } from './contact-tag/contact-tag.controller';
import { ContactTagService } from './contact-tag/contact-tag.service';
import { ContactAssignedToService } from './contact/contact-assigned-to.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
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
        uri: configService.getOrThrow<string>('BROKER_URL'),
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
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; PlatformService/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
  ],
  controllers: [
    ChannelController,
    ChatController,
    ContactController,
    ContactTagController,
    CustomFieldController,
    HsmController,
    MessageController,
    TagController,
  ],
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
    ChannelRepository,
    ChannelService,
    ChatService,
    ContactAssignedToService,
    ContactService,
    ContactTagService,
    ContactFieldService,
    HsmService,
    MessageService,
    TagService,
  ],
})
export class AppModule {}
