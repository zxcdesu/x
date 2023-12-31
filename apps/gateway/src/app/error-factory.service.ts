import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@zxcdesu/nestjs-rabbitmq';

@Injectable()
export class ErrorFactoryService implements ErrorFactory {
  errorFactory(error?: any): Error {
    return error;
  }
}
