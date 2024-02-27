import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DataAccessSubscriptionModule } from '@zxcdesu/data-access-subscription';
import { DataAccessWalletModule } from '@zxcdesu/data-access-wallet';
import { FeaturePaymentProviderModule } from '@zxcdesu/feature-payment-provider';
import joi from 'joi';
import { PaymentController } from './payment/payment.controller';
import { SubscriptionController } from './subscription/subscription.controller';
import { WalletController } from './wallet/wallet.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().uri().required(),
        BROKER_URL: joi.string().uri().required(),
        YOOKASSA_SHOP_ID: joi.string().required(),
        YOOKASSA_TOKEN: joi.string().required(),
        YOOKASSA_RETURN_URL: joi.string().uri().required(),
      }),
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.getOrThrow<string>('BROKER_URL'),
        exchanges: [
          {
            name: 'billing',
            type: 'topic',
          },
        ],
        prefetchCount: 1,
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    DataAccessSubscriptionModule,
    DataAccessWalletModule,
    FeaturePaymentProviderModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        yookassa: {
          shopId: configService.getOrThrow<string>('YOOKASSA_SHOP_ID'),
          token: configService.getOrThrow<string>('YOOKASSA_TOKEN'),
          returnUrl: configService.getOrThrow<string>('YOOKASSA_RETURN_URL'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PaymentController, SubscriptionController, WalletController],
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
