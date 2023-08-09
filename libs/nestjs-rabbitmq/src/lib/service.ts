import { AmqpConnection, RequestOptions } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { ERROR_FACTORY } from './constants';
import { ErrorFactory } from './interfaces';

export class RmqService {
  constructor(
    protected readonly amqpConnection: AmqpConnection,
    @Inject(ERROR_FACTORY) private readonly errorFactory: ErrorFactory,
  ) {}

  protected async request<T>(requestOptions: RequestOptions): Promise<T> {
    const { error, ...payload } = await this.amqpConnection.request<
      T & {
        error?: any;
      }
    >(requestOptions);
    if (error) {
      throw this.errorFactory(error);
    }
    return payload as T;
  }
}
