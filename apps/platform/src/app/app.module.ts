import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DataAccessChannelModule } from '@zxcdesu/data-access-channel';
import { DataAccessChatModule } from '@zxcdesu/data-access-chat';
import { DataAccessContactModule } from '@zxcdesu/data-access-contact';
import { DataAccessContactFieldModule } from '@zxcdesu/data-access-contact-field';
import { DataAccessContactTagModule } from '@zxcdesu/data-access-contact-tag';
import { DataAccessFieldModule } from '@zxcdesu/data-access-field';
import { DataAccessHsmModule } from '@zxcdesu/data-access-hsm';
import { DataAccessMessageModule } from '@zxcdesu/data-access-message';
import { DataAccessTagModule } from '@zxcdesu/data-access-tag';
import { FeatureChannelManagerModule } from '@zxcdesu/feature-channel-manager';
import { FeatureChatManagerModule } from '@zxcdesu/feature-chat-manager';
import { FeatureMessageManagerModule } from '@zxcdesu/feature-message-manager';
import { FeatureThirdPartyApiRepositoryModule } from '@zxcdesu/feature-third-party-api-repository';
import joi from 'joi';
import { ChannelController } from './channel/channel.controller';
import { ChatController } from './chat/chat.controller';
import { CustomFieldController } from './contact-field/custom-field.controller';
import { ContactTagController } from './contact-tag/contact-tag.controller';
import { ContactController } from './contact/contact.controller';
import { HsmController } from './hsm/hsm.controller';
import { MessageController } from './message/message.controller';
import { TagController } from './tag/tag.controller';

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
      inject: [ConfigService],
    }),
    DataAccessChannelModule,
    DataAccessChatModule,
    DataAccessContactModule,
    DataAccessContactFieldModule,
    DataAccessContactTagModule,
    DataAccessFieldModule,
    DataAccessHsmModule,
    DataAccessMessageModule,
    DataAccessTagModule,
    FeatureChannelManagerModule,
    FeatureChatManagerModule,
    FeatureMessageManagerModule,
    FeatureThirdPartyApiRepositoryModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        gatewayUrl: configService.getOrThrow<string>('GATEWAY_URL'),
        handlers: [],
      }),
      inject: [ConfigService],
      imports: [FeatureMessageManagerModule],
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
