import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import joi from 'joi';
import { MailingWorkerController } from './mailing-worker/mailing-worker.controller';
import { MailingWorkerService } from './mailing-worker/mailing-worker.service';
import { MailingController } from './mailing/mailing.controller';
import { MailingService } from './mailing/mailing.service';
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
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        enableControllerDiscovery: true,
        uri: configService.getOrThrow<string>('BROKER_URL'),
        exchanges: [
          {
            name: 'mailings',
            type: 'topic',
          },
          {
            name: 'mailings.worker',
            type: 'topic',
          },
        ],
        prefetchCount: 1,
        connectionInitOptions: {
          wait: false,
        },
      }),
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [MailingController, MailingWorkerController],
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
    MailingService,
    MailingWorkerService,
  ],
})
export class AppModule {}
