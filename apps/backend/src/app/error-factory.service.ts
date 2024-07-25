import { HttpException, Injectable } from '@nestjs/common';
import { ErrorFactory } from '@zxcdesu/util-rmq';

@Injectable()
export class ErrorFactoryService implements ErrorFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorFactory(error?: any): Error {
    return new HttpException(error, error?.statusCode);
  }
}
