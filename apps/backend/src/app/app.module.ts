import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { AdminRmq } from '@zxcdesu/data-access-admin';
import { UserRmq } from '@zxcdesu/data-access-user';
import { GqlExceptionFilter } from '@zxcdesu/util-gql';
import joi from 'joi';
import { ErrorFactoryService } from './error-factory.service';
import { PubSubService } from './pubsub.service';
import { userResolver } from './user/user.resolver';

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
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: true,
      allowBatchedQueries: true,
      subscription: {
        pubsub: PubSubService.useFactory(),
        context: (_, req) => ({
          req,
        }),
      },
    }),
  ],
  controllers: [],
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
    {
      provide: APP_FILTER,
      useClass: GqlExceptionFilter,
    },
    PubSubService,
    userResolver,
    ErrorFactoryService,
    UserRmq.provide(ErrorFactoryService),
    AdminRmq.provide(ErrorFactoryService),
  ],
})
export class AppModule {}
