import {
  AmqpConnection,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import type { Provider, Type } from '@nestjs/common';
import { ErrorFactory } from './error-factory.interface';
import { replyErrorHandler } from './error-handlers/reply-error-handler';

export class RmqService {
  static rpc: typeof RabbitRPC = (config) =>
    RabbitRPC({
      errorHandler: replyErrorHandler,
      ...config,
    });
  static subscribe = RabbitSubscribe;

  static provide(errorFactory: Type<ErrorFactory>): Provider {
    return {
      provide: this,
      useFactory: (
        amqpConnection: AmqpConnection,
        errorFactory: ErrorFactory,
      ) => new this(amqpConnection, errorFactory),
      inject: [AmqpConnection, errorFactory],
    };
  }

  protected constructor(
    protected readonly amqpConnection: AmqpConnection,
    private readonly errorFactory: ErrorFactory<unknown>,
  ) {}

  protected async request<T>(
    ...args: Parameters<AmqpConnection['request']>
  ): Promise<T> {
    const response = await this.amqpConnection.request<
      T & {
        status?: 'error';
      }
    >(...args);
    if (response.status === 'error' && 'error' in response) {
      delete response.status;
      throw this.errorFactory.errorFactory(response);
    }
    return response;
  }

  protected publish(...args: Parameters<AmqpConnection['publish']>) {
    return this.amqpConnection.publish(...args);
  }
}
