import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule);
  Logger.log('🚀 Application is running');
}

bootstrap();
