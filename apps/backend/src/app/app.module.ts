import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import joi from 'joi';
import { BearerAuthStrategy } from './auth/bearer-auth.strategy';
import { BotTemplateResolver } from './bot-template/bot-template.resolver';
import { BotResolver } from './bot/bot.resolver';
import { ChannelResolver } from './channel/channel.resolver';
import { ChatResolver } from './chat/chat.resolver';
import { ContactResolver } from './contact/contact.resolver';
import { IntegrationResolver } from './integration/integration.resolver';
import { MailingResolver } from './mailing/mailing.resolver';
import { MessageResolver } from './message/message.resolver';
import { ProjectResolver } from './project/project.resolver';
import { SubscriptionResolver } from './subscription/subscription.resolver';
import { UserResolver } from './user/user.resolver';
import { WalletResolver } from './wallet/wallet.resolver';
import { WebhookResolver } from './webhook/webhook.resolver';

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
  controllers: [],
  providers: [
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
  ],
})
export class AppModule {}
