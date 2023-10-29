import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@platform/nestjs-rabbitmq';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class ErrorFactoryService implements ErrorFactory {
  errorFactory(error?: any): Error {
    return new ApolloError(error?.message, undefined, error);
  }
}
