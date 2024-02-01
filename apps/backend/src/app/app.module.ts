import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import joi from 'joi';
import mapObject from 'map-obj';
import { AdminRmq } from './admin/admin.rmq';
import { BearerAuthStrategy } from './auth/bearer-auth.strategy';
import { BotTemplateResolver } from './bot-template/bot-template.resolver';
import { BotTemplateRmq } from './bot-template/bot-template.rmq';
import { BotResolver } from './bot/bot.resolver';
import { BotRmq } from './bot/bot.rmq';
import { ChannelResolver } from './channel/channel.resolver';
import { ChannelRmq } from './channel/channel.rmq';
import { ChatController } from './chat/chat.controller';
import { ChatResolver } from './chat/chat.resolver';
import { ChatRmq } from './chat/chat.rmq';
import { ChatService } from './chat/chat.service';
import { ContactResolver } from './contact/contact.resolver';
import { ContactRmq } from './contact/contact.rmq';
import { ContactService } from './contact/contact.service';
import { ErrorFactoryService } from './error-factory.service';
import { HsmResolver } from './hsm/hsm.resolver';
import { HsmRmq } from './hsm/hsm.rmq';
import { IntegrationResolver } from './integration/integration.resolver';
import { IntegrationRmq } from './integration/integration.rmq';
import { InviteResolver } from './invite/invite.controller';
import { InviteRmq } from './invite/invite.rmq';
import { MailingResolver } from './mailing/mailing.resolver';
import { MailingRmq } from './mailing/mailing.rmq';
import { MessageController } from './message/message.controller';
import { MessageResolver } from './message/message.resolver';
import { MessageRmq } from './message/message.rmq';
import { NotificationRmq } from './notification/notification.rmq';
import { PaymentResolver } from './payment/payment.resolver';
import { PaymentRmq } from './payment/payment.rmq';
import { ProjectUserResolver } from './project-user/project-user.controller';
import { ProjectUserRmq } from './project-user/project-user.rmq';
import { ProjectResolver } from './project/project.resolver';
import { ProjectRmq } from './project/project.rmq';
import { PubSubService } from './pubsub.service';
import { SubscriberResolver } from './subscriber/subscriber.resolver';
import { SubscriberRmq } from './subscriber/subscriber.rmq';
import { SubscriptionResolver } from './subscription/subscription.resolver';
import { SubscriptionRmq } from './subscription/subscription.rmq';
import { TagResolver } from './tag/tag.resolver';
import { TagRmq } from './tag/tag.rmq';
import { UserResolver } from './user/user.resolver';
import { UserRmq } from './user/user.rmq';
import { WalletResolver } from './wallet/wallet.resolver';
import { WalletRmq } from './wallet/wallet.rmq';
import { WebhookResolver } from './webhook/webhook.resolver';
import { WebhookRmq } from './webhook/webhook.rmq';

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
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.get<string>('BROKER_URL'),
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
      context: ({ req, extra, connectionParams }) =>
        connectionParams
          ? {
              req: Object.assign(extra.request, {
                headers: mapObject(
                  connectionParams,
                  (key, value) => [String(key).toLowerCase(), value],
                  {
                    deep: true,
                  },
                ),
              }),
            }
          : {
              req,
            },
    }),
    PassportModule,
  ],
  controllers: [ChatController, MessageController],
  providers: [
    PubSubService,
    BearerAuthStrategy,
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
    NotificationRmq.provide(ErrorFactoryService),
    PaymentRmq.provide(ErrorFactoryService),
    ProjectRmq.provide(ErrorFactoryService),
    ProjectUserRmq.provide(ErrorFactoryService),
    SubscriberRmq.provide(ErrorFactoryService),
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
