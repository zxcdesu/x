import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@platform/nestjs-rabbitmq';

@Injectable()
export class ErrorFactoryService implements ErrorFactory {
  errorFactory(error?: any): Error {
    return error;
  }
}
