import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@zxcdesu/nestjs-rabbitmq';

@Injectable()
export class ErrorFactoryService implements ErrorFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorFactory(error?: any): Error {
    return error;
  }
}
