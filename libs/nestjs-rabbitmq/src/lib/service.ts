import { AmqpConnection, RequestOptions } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { ERROR_FACTORY } from './constants';
import { ErrorFactory } from './interfaces';

export class RmqService {
  constructor(
    protected readonly amqpConnection: AmqpConnection,
    @Inject(ERROR_FACTORY) protected readonly errorFactory: ErrorFactory,
  ) {}

  protected async request<T>(requestOptions: RequestOptions): Promise<T> {
    const { error, payload } = await this.amqpConnection.request<{
      error?: any;
      payload: T;
    }>(requestOptions);
    if (error) {
      throw this.errorFactory(error);
    }
    return payload;
  }
}
