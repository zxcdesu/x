import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { ERROR_FACTORY } from '@platform/nestjs-rabbitmq';
import { ApolloError } from 'apollo-server-express';
import joi from 'joi';
import { BearerAuthStrategy } from './auth/bearer-auth.strategy';
import { BotTemplateResolver } from './bot-template/bot-template.resolver';
import { BotTemplateRmq } from './bot-template/bot-template.rmq';
import { BotResolver } from './bot/bot.resolver';
import { BotRmq } from './bot/bot.rmq';
import { ChannelResolver } from './channel/channel.resolver';
import { ChannelRmq } from './channel/channel.rmq';
import { ChatResolver } from './chat/chat.resolver';
import { ChatRmq } from './chat/chat.rmq';
import { ContactResolver } from './contact/contact.resolver';
import { ContactRmq } from './contact/contact.rmq';
import { IntegrationResolver } from './integration/integration.resolver';
import { IntegrationRmq } from './integration/integration.rmq';
import { MailingResolver } from './mailing/mailing.resolver';
import { MailingRmq } from './mailing/mailing.rmq';
import { MessageResolver } from './message/message.resolver';
import { MessageRmq } from './message/message.rmq';
import { ProjectResolver } from './project/project.resolver';
import { ProjectRmq } from './project/project.rmq';
import { SubscriptionResolver } from './subscription/subscription.resolver';
import { SubscriptionRmq } from './subscription/subscription.rmq';
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
        PORT: joi.number().port().default(3000),
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
            name: 'backend',
            type: 'topic',
          },
        ],
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    PassportModule,
  ],
  providers: [
    {
      provide: ERROR_FACTORY,
      useValue: (error?: any) => {
        return new ApolloError(error?.message, undefined, error);
      },
    },
    BearerAuthStrategy,
    BotResolver,
    BotTemplateResolver,
    ChannelResolver,
    ChatResolver,
    ContactResolver,
    IntegrationResolver,
    MailingResolver,
    MessageResolver,
    ProjectResolver,
    SubscriptionResolver,
    UserResolver,
    WalletResolver,
    WebhookResolver,
    BotRmq,
    BotTemplateRmq,
    ChannelRmq,
    ChatRmq,
    ContactRmq,
    IntegrationRmq,
    MailingRmq,
    MessageRmq,
    ProjectRmq,
    SubscriptionRmq,
    UserRmq,
    WalletRmq,
    WebhookRmq,
  ],
})
export class AppModule {}
