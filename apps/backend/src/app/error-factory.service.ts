import { Injectable } from '@nestjs/common';
import { ErrorFactory } from '@zxcdesu/util-rmq';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class ErrorFactoryService implements ErrorFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorFactory(error?: any): Error {
    return new ApolloError(error?.message, undefined, error);
  }
}
