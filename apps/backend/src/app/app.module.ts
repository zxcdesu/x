import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { AdminRmq } from '@zxcdesu/data-access-admin';
import { BotRmq } from '@zxcdesu/data-access-bot';
import { BotTemplateRmq } from '@zxcdesu/data-access-bot-template';
import { ChannelRmq } from '@zxcdesu/data-access-channel';
import { ChatRmq } from '@zxcdesu/data-access-chat';
import { ContactRmq } from '@zxcdesu/data-access-contact';
import { HsmRmq } from '@zxcdesu/data-access-hsm';
import { IntegrationRmq } from '@zxcdesu/data-access-integration';
import { InviteRmq } from '@zxcdesu/data-access-invite';
import { MailingRmq } from '@zxcdesu/data-access-mailing';
import { MessageRmq } from '@zxcdesu/data-access-message';
import { NotificationSubscriberRmq } from '@zxcdesu/data-access-notification-subscriber';
import { PaymentRmq } from '@zxcdesu/data-access-payment';
import { ProjectRmq } from '@zxcdesu/data-access-project';
import { ProjectUserRmq } from '@zxcdesu/data-access-project-user';
import { SubscriptionRmq } from '@zxcdesu/data-access-subscription';
import { TagRmq } from '@zxcdesu/data-access-tag';
import { UserRmq } from '@zxcdesu/data-access-user';
import { WalletRmq } from '@zxcdesu/data-access-wallet';
import { WebhookRmq } from '@zxcdesu/data-access-webhook';
import type { Request } from 'express';
import joi from 'joi';
import { mapValues } from 'lodash';
import { BotTemplateResolver } from './bot-template/bot-template.resolver';
import { BotResolver } from './bot/bot.resolver';
import { ChannelResolver } from './channel/channel.resolver';
import { ChatController } from './chat/chat.controller';
import { ChatResolver } from './chat/chat.resolver';
import { ChatService } from './chat/chat.service';
import { ContactResolver } from './contact/contact.resolver';
import { ContactService } from './contact/contact.service';
import { ErrorFactoryService } from './error-factory.service';
import { HsmResolver } from './hsm/hsm.resolver';
import { IntegrationResolver } from './integration/integration.resolver';
import { InviteResolver } from './invite/invite.controller';
import { MailingResolver } from './mailing/mailing.resolver';
import { MessageController } from './message/message.controller';
import { MessageResolver } from './message/message.resolver';
import { SubscriberResolver } from './notification-subscriber/notification-subscriber.resolver';
import { PaymentResolver } from './payment/payment.resolver';
import { ProjectUserResolver } from './project-user/project-user.controller';
import { ProjectResolver } from './project/project.resolver';
import { PubSubService } from './pubsub.service';
import { SubscriptionResolver } from './subscription/subscription.resolver';
import { TagResolver } from './tag/tag.resolver';
import { UserResolver } from './user/user.resolver';
import { WalletResolver } from './wallet/wallet.resolver';
import { WebhookResolver } from './webhook/webhook.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        BROKER_URL: joi.string().uri().required(),
        PORT: joi.number().port().default(4200),
        SECRET: joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('SECRET'),
      }),
      inject: [ConfigService],
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.getOrThrow<string>('BROKER_URL'),
        exchanges: [
          {
            name: 'backend',
            type: 'topic',
          },
        ],
        prefetchCount: 1,
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      allowBatchedHttpRequests: true,
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({
        req,
        extra,
        connectionParams,
        ...other
      }: {
        req?: Request;
        connectionParams?: Record<string, unknown>;
        extra?: {
          request: Request;
        };
        [key: string]: unknown;
      }) =>
        Object.assign(other, {
          req:
            connectionParams && extra
              ? Object.assign(extra.request, {
                  headers: mapValues(connectionParams, (key, value) => [
                    String(key).toLowerCase(),
                    value,
                  ]),
                })
              : req,
        }),
    }),
  ],
  controllers: [ChatController, MessageController],
  providers: [
    PubSubService,
    BotResolver,
    BotTemplateResolver,
    ChannelResolver,
    ChatResolver,
    ContactResolver,
    HsmResolver,
    IntegrationResolver,
    InviteResolver,
    MailingResolver,
    MessageResolver,
    PaymentResolver,
    ProjectResolver,
    ProjectUserResolver,
    SubscriberResolver,
    SubscriptionResolver,
    TagResolver,
    UserResolver,
    WalletResolver,
    WebhookResolver,
    ErrorFactoryService,
    AdminRmq.provide(ErrorFactoryService),
    BotRmq.provide(ErrorFactoryService),
    BotTemplateRmq.provide(ErrorFactoryService),
    ChannelRmq.provide(ErrorFactoryService),
    ChatRmq.provide(ErrorFactoryService),
    ContactRmq.provide(ErrorFactoryService),
    HsmRmq.provide(ErrorFactoryService),
    IntegrationRmq.provide(ErrorFactoryService),
    InviteRmq.provide(ErrorFactoryService),
    MailingRmq.provide(ErrorFactoryService),
    MessageRmq.provide(ErrorFactoryService),
    NotificationSubscriberRmq.provide(ErrorFactoryService),
    PaymentRmq.provide(ErrorFactoryService),
    ProjectRmq.provide(ErrorFactoryService),
    ProjectUserRmq.provide(ErrorFactoryService),
    SubscriptionRmq.provide(ErrorFactoryService),
    TagRmq.provide(ErrorFactoryService),
    UserRmq.provide(ErrorFactoryService),
    WalletRmq.provide(ErrorFactoryService),
    WebhookRmq.provide(ErrorFactoryService),
    ChatService,
    ContactService,
  ],
})
export class AppModule {}
