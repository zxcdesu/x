import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { ERROR_FACTORY } from './constants';
import { ErrorFactory } from './interfaces';

export class RmqService {
  constructor(
    protected readonly amqpConnection: AmqpConnection,
    @Inject(ERROR_FACTORY) private readonly errorFactory: ErrorFactory,
  ) {}

  protected async request<T>(
    ...args: Parameters<AmqpConnection['request']>
  ): Promise<T> {
    const payload = await this.amqpConnection.request<
      T & {
        error?: any;
      }
    >(...args);
    if (payload.error) {
      throw this.errorFactory(payload.error);
    }
    return payload;
  }

  protected publish(...args: Parameters<AmqpConnection['publish']>) {
    return this.amqpConnection.publish(...args);
  }
}
